import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SpotService} from '../../../services/spot.service';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-session-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './session-form.html'
})

export class SessionForm implements OnInit {
  sessionFormParam: any;
  spotIdParam: any;
  session: any;
  spots: any;
  error: any;
  errorUrl: any;
  loading: boolean = false;

  date: string = new Date().toISOString().substring(0, 10);
  startTime: string = new Date(Date.now() - 3600000).toISOString().substring(11, 16);
  endTime: string = new Date().toISOString().substring(11, 16);
  hover: number = 0;


  constructor(private sessionService: SessionService,
              private spotService: SpotService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe( params => this.sessionFormParam = params['param']);
    this.route.queryParams.subscribe(params => { this.spotIdParam = params['id']; });
  }

  ngOnInit() {
    this.error = null;
    this.loading = true;

    this.session = {
      "Spot": {
        "Id": null,
        "Name": "",
        "Latitude": 0,
        "Longitude": 0,
        "Sessions": []
      },
      "Forecast": {
        "dateTime": "26/05/2025",
        "weatherCode": 3,
        "temperature": 18,
        "waveHeight": 1.9,
        "waveDirection": 264,
        "wavePeriod": 8.4,
        "windSpeed": 22,
        "windDirection": 102
      },
      "StartTime": null,
      "EndTime": null,
      "Rating": 0,
      "Comment": ""
    }

    if(this.spotIdParam !== undefined) {
      this.session.Spot.Id = this.spotIdParam;
    }

    this.spotService.getSpots()
      .subscribe({
        next: (data) => {
          this.spots = data;
        },
        error: (err) => { this.loading = false; this.toastrService.error("Erreur dans les récupération des spots : " + err.message) }
      });

    if (!isNaN(Number(this.sessionFormParam))) {
      this.loading = true;
      this.sessionService.getSessionById(this.sessionFormParam)
        .subscribe({
          next: (data) => {
            this.session = data;
            this.startTime = this.session.StartTime.substring(11, 16);
            this.endTime = this.session.EndTime.substring(11, 16);
            this.loading = false;
          },
          error: (err) => { this.loading = false; this.showError(err) }
        });
    } else {
      this.loading = false;
    }

  }

  saveSession() {
    this.loading = true;
    this.session.StartTime = new Date(`${this.date}T${this.startTime}`).toISOString();
    this.session.EndTime = new Date(`${this.date}T${this.endTime}`).toISOString();

    if (this.sessionFormParam == 'new') {
      this.createNewSession();
    } else if (!isNaN(Number(this.sessionFormParam))){
      this.updateSession()
    }
  }

  createNewSession() {
    this.sessionService.createSession(this.session).subscribe({
      next: () => {
          this.router.navigate(["/sessions"]).then();
          this.toastrService.success(" La session a bien été créée.")
        this.loading = false;
      },
      error: (err) => { this.loading = false; this.toastrService.error(err.message) }
    })
  }

  updateSession() {
    this.sessionService.updateSession(this.sessionFormParam, this.session).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/sessions"]).then();
        this.toastrService.success(" La session a bien été modifiée.");
      },
      error: (err) => { this.loading = false; this.toastrService.error(err.message) }
    })
  }

  showError(err: any) {
    console.error('Erreur :', err);
    this.error = `HTTP ${err.status} - ${err.statusText} : `;
    this.errorUrl = err.url;
    this.loading = false;
  }

}
