import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import * as L from 'leaflet';
import {ForecastComponent} from '../forecast/forecast.component';
import {MapComponent} from '../map/map.component';

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
export class GuestComponent implements OnInit {

  forecasts: any;
  error: any;
  errorUrl: any;

  constructor(private http: HttpClient, private forecastService: ForecastService) {  }

  ngOnInit() {
    this.forecastService.getGuestForecast(47.124498, -2.216052).
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
  }

}
