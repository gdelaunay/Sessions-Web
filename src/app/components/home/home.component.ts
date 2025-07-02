import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {HttpClient} from '@angular/common/http';
import {ForecastService} from '../../services/forecast.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  forecasts: any;

  constructor(private http: HttpClient, private forecastService: ForecastService) {  }

  ngOnInit() {
    this.forecastService.getMarineForecastDaily(47.124498, -2.216052).
    subscribe({
      next: (data) => {
        this.forecasts = data;
      },
      error: (err) => {
        console.error('Erreur :', err);
      }
    });


  }

}
