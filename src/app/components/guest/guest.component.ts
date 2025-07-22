import {Component, ElementRef, ViewChild} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import {ForecastComponent} from '../forecast/forecast.component';
import {MapComponent} from '../map/map.component';
import {roundTo} from '../../utils';

@Component({
  selector: 'app-guest',
  imports: [
    FooterComponent,
    ForecastComponent,
    MapComponent,
    NgIf
  ],
  templateUrl: './guest.component.html'
})
export class GuestComponent {

  forecasts: any;
  error: any;
  errorUrl: any;
  loading: boolean = false;

  constructor(private http: HttpClient, private forecastService: ForecastService) {  }

  @ViewChild('validateCoordsBtn') validateCoordsBtn!: ElementRef;
  @ViewChild('latInput') latInput!: ElementRef;
  @ViewChild('lonInput') lonInput!: ElementRef;

  getForecasts(){
    this.validateCoordsBtn.nativeElement.blur();
    this.loading = true;
    this.forecastService.getGuestForecast(this.latInput.nativeElement.value, this.lonInput.nativeElement.value).
    subscribe({
      next: (data) => {
        this.forecasts = data;
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.error = `HTTP ${err.status} - ${err.statusText} : `;
        this.errorUrl = err.url;
      }
    });
    this.loading = false;
  }

  updateCoords(e: { lat: number; lon: number }) {
    this.latInput.nativeElement.value = roundTo(e.lat, 6);
    this.lonInput.nativeElement.value = roundTo(e.lon, 6);
  }

}
