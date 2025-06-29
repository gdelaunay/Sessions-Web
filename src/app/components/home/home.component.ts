import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    NgIf
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  forecast: any;

  constructor(private http: HttpClient, private forecastService: ForecastService) {  }

  ngOnInit() {
    this.forecastService.getMarineForecastDaily(52.25, 21.15).
    subscribe({
      next: (data) => {
        this.forecast = data;
      },
      error: (err) => {
        console.error('Erreur :', err);
      }
    });
  }

}
