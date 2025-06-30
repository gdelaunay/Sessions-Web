import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private forecastApiUrl = 'https://marine-api.open-meteo.com/v1/';
  private testUrl = 'http://localhost:5038/api/dailyforecast';
  constructor(private http: HttpClient) { }
  getMarineForecastDaily() {
    return this.http.get<any>(this.testUrl);
  }

  /*
  getMarineForecastDaily( lat : number, long : number) {
    return this.http.get<any>(`${this.forecastApiUrl}/marine?latitude=${lat}&longitude=${long}&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=Europe%2FBerlin`)
  }
   */
}
//https://marine-api.open-meteo.com/v1/marine?latitude=54.544587&longitude=10.227487&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=Europe%2FBerlin
