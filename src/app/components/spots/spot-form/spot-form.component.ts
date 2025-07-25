import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {MapComponent} from '../../map/map.component';
import {FooterComponent} from '../../footer/footer.component';
import {SpotService} from '../../../services/spot.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {roundTo} from '../../../utils';

@Component({
  selector: 'app-spot-form',
  imports: [
    NgIf,
    FooterComponent,
    FormsModule,
    MapComponent
  ],
  templateUrl: './spot-form.component.html'
})
export class SpotFormComponent implements OnInit {
  spotFormParam: any;
  spot: any;
  error: any;
  errorUrl: any;
  loading: boolean = false;

  @ViewChild('latInput') latInput!: ElementRef;
  @ViewChild('lonInput') lonInput!: ElementRef;

  constructor(private spotService: SpotService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => this.spotFormParam = params['param']);
  }

  ngOnInit() {
    this.error = null;
    this.spot = {
      "Name": "",
      "Latitude": 0,
      "Longitude": 0,
      "Sessions": [
      ]
    }

    if (!isNaN(Number(this.spotFormParam))) {
      this.loading = true;
      this.spotService.getSpotById(this.spotFormParam)
        .subscribe({
          next: (data) => {
            this.spot = data;
            this.loading = false;
          },
          error: (err) => { this.showError(err) }
        });
    }
  }

  saveSpot() {
    this.loading = true;
    if (this.spotFormParam == 'new') {
      this.createNewSpot();
    } else if (!isNaN(Number(this.spotFormParam))){
      this.updateSpot()
    }
  }

  createNewSpot() {
    this.spotService.createSpot(this.spot).subscribe({
      next: (res) => {
        if (res.headers.get('Location')) {
          this.router.navigate(["/spot/", res.headers.get('Location')?.split('/').pop()]).then();
        }
        this.loading = false;
      },
      error: (err) => { this.showError(err) }
    })
  }

  updateSpot() {
    this.spotService.updateSpot(this.spotFormParam, this.spot).subscribe({
      next: (res) => {
        if (res.headers.get('Location')) {
          this.router.navigate(["/spot/", res.headers.get('Location')?.split('/').pop()]).then();
        }
        this.loading = false;
      },
      error: (err) => { this.showError(err) }
    })
  }

  updatePosition(e: { lat: number; lon: number }) {
    this.spot.Latitude = roundTo(e.lat, 6);
    this.spot.Longitude = roundTo(e.lon, 6);
  }

  showError(err: any) {
    console.error('Erreur :', err);
    this.error = `HTTP ${err.status} - ${err.statusText} : `;
    this.errorUrl = err.url;
    this.loading = false;
  }

}
