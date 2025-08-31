import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import {ForecastComponent} from '../forecast/forecast.component';
import {IdentityService} from '../../services/identity.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    ForecastComponent,
    RouterLink
  ],
  templateUrl: './home-page.html'
})
export class HomePage implements OnInit {

  dailyForecasts: any;
  hourly3Forecasts: any;
  loading: boolean = false;
  error: any;
  errorUrl: any;

  constructor(private forecastService: ForecastService, public identityService: IdentityService) {  }

  ngOnInit() {
    this.loading = true;
    this.error = null;
    this.forecastService.getForecastDaily(47.124498, -2.216052)
      .subscribe({
      next: (data) => {
        this.dailyForecasts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur :', err);
        this.error = `HTTP ${err.status} - ${err.statusText} : `;
        this.errorUrl = err.url;
        this.loading = false;
      }
    });
    this.forecastService.getForecast3Hourly(47.124498, -2.216052)
      .subscribe({
        next: (data) => {
          this.hourly3Forecasts = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur :', err);
          this.error = `HTTP ${err.status} - ${err.statusText} : `;
          this.errorUrl = err.url;
          this.loading = false;
        }
      });
  }

}
