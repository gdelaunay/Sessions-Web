import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-guest',
  imports: [
    FooterComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './guest.component.html'
})
export class GuestComponent implements OnInit, AfterViewInit {

  forecasts: any;
  error: any;
  errorUrl: any;

  constructor(private http: HttpClient, private forecastService: ForecastService) {  }

  ngOnInit() {
    this.forecastService.getMarineForecastDaily(47.124498, -2.216052).
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

  ngAfterViewInit() {
    var map = L.map('map').setView([51.505, -0.09], 13);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

}
