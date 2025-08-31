import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {sessionsApiUrl} from '../app';

@Injectable({ providedIn: 'root' })
export class ForecastService {

  private dailyForecastUrl = sessionsApiUrl + '/forecast/daily';
  private hourly3ForecastUrl = sessionsApiUrl + '/forecast/3hourly';

  private standaloneForecastUrl = 'https://marine-api.open-meteo.com/v1/marine';
  private standaloneForecastParams = 'daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=Europe%2FBerlin'

  constructor(private http: HttpClient) { }

  getForecastDaily( lat : number, lon: number ) {
    return this.http.get<any>(`${this.dailyForecastUrl}?lat=${lat}&lon=${lon}`, { withCredentials: true });
  }

  getForecast3Hourly( lat : number, lon: number ) {
    return this.http.get<any>(`${this.hourly3ForecastUrl}?lat=${lat}&lon=${lon}`, { withCredentials: true });
  }

  getStandaloneForecast( lat : number, lon: number ) {
    return this.http.get<any>(`${this.standaloneForecastUrl}?latitude=${lat}&longitude=${lon}&${this.standaloneForecastParams}`);
  }

}
