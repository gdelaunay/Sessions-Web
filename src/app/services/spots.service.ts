import { Injectable } from '@angular/core';
import {sessionsApiUrl} from '../app.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {

  private spotsUrl = sessionsApiUrl + '/spot';

  constructor(private http: HttpClient) { }

  getSpots() {
    return this.http.get<any[]>(this.spotsUrl)
  }
  getSpotById( id : number ) {
    return this.http.get<any[]>(`${this.spotsUrl}/${id}`)
  }
  createSpot( data: any ) {
    return this.http.post(this.spotsUrl, data, { observe: 'response' })
  }
  updateSpot( id : number, data: any ) {
    return this.http.put(`${this.spotsUrl}/${id}`, data)
  }
  deleteSpot( id : number) {
    console.log( id )
    return this.http.delete(`${this.spotsUrl}/${id}`)
  }
}
