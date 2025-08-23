import { Injectable } from '@angular/core';
import {sessionsApiUrl} from '../app';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SessionService {

  private sessionsUrl = sessionsApiUrl + '/session';

  constructor(private http: HttpClient) { }

  getSessions() {
    return this.http.get<any[]>(this.sessionsUrl, { withCredentials: true })
  }
  getSessionById( id : number ) {
    return this.http.get<any[]>(`${this.sessionsUrl}/${id}`, { withCredentials: true })
  }
  createSession( data: any ) {
    return this.http.post(this.sessionsUrl, data, { observe: 'response', withCredentials: true })
  }
  updateSession( id : number, data: any ) {
    return this.http.put(`${this.sessionsUrl}/${id}`, data, { observe: 'response', withCredentials: true })
  }
  deleteSession( id : number) {
    return this.http.delete(`${this.sessionsUrl}/${id}`, { withCredentials: true })
  }
}
