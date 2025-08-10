import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-session-form',
    imports: [],
  templateUrl: './session-form.component.html'
})

export class SessionFormComponent implements OnInit {
  sessionFormParam: any;
  session: any;
  error: any;
  errorUrl: any;
  loading: boolean = false;

  constructor(private sessionService: SessionService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => this.sessionFormParam = params['param']);
  }

  ngOnInit() {
    this.error = null;
    this.session = {
      "spot": {
        "Id": null,
        "Name": "",
        "Latitude": 0,
        "Longitude": 0,
        "Sessions": []
      },
      "forecast": {
        "DateTime": null,
        "WeatherCode": null,
        "Temperature": null,
        "WaveHeight": null,
        "WaveDirection": null,
        "WavePeriod": null,
        "WindSpeed": null,
        "WindDirection": null
      },
      "startTime": null,
      "endTime": null,
      "rating": null,
      "comment": ""
    }

    if (!isNaN(Number(this.sessionFormParam))) {
      this.loading = true;
      this.sessionService.getSessionById(this.sessionFormParam)
        .subscribe({
          next: (data) => {
            this.session = data;
            this.loading = false;
          },
          error: (err) => { this.loading = false; this.showError(err) }
        });
    }
  }

  saveSession() {
    this.loading = true;
    if (this.sessionFormParam == 'new') {
      this.createNewSession();
    } else if (!isNaN(Number(this.sessionFormParam))){
      this.updateSession()
    }
  }

  createNewSession() {
    this.sessionService.createSession(this.session).subscribe({
      next: (res) => {
        if (res.headers.get('Location')) {
          this.router.navigate(["/session/", res.headers.get('Location')?.split('/').pop()]).then();
        }
        this.loading = false;
      },
      error: (err) => { this.loading = false; this.showError(err) }
    })
  }

  updateSession() {
    this.sessionService.updateSession(this.sessionFormParam, this.session).subscribe({
      next: (res) => {
        if (res.headers.get('Location')) {
          this.router.navigate(["/session/", res.headers.get('Location')?.split('/').pop()]).then();
        }
        this.loading = false;
      },
      error: (err) => { this.showError(err) }
    })
  }

  showError(err: any) {
    console.error('Erreur :', err);
    this.error = `HTTP ${err.status} - ${err.statusText} : `;
    this.errorUrl = err.url;
    this.loading = false;
  }

}
