import {Injectable, signal} from '@angular/core';
import {sessionsApiUrl} from '../app';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdentityService {

  currentUser = signal<any>(null);

  constructor(private http: HttpClient) { }

  setUser(user: any) { this.currentUser.set(user); }
  clearUser() { this.currentUser.set(null); }

  register(data: { email: string; password: string }) {
    return this.http.post(`${sessionsApiUrl}/register`, data, { withCredentials: true })
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${sessionsApiUrl}/login?useCookies=true`, data, { withCredentials: true }).pipe(
      switchMap(() => this.http.get<any>(`${sessionsApiUrl}/account`, { withCredentials: true })),
      tap(user => this.setUser(user))
    );
  }

  logout(data: {}) {
    return this.http.post(`${sessionsApiUrl}/logout`, data, { withCredentials: true }).pipe(tap(() =>this.clearUser()));
  }

  deleteAccount() {
    return this.http.delete(`${sessionsApiUrl}/account`, { withCredentials: true }).pipe(tap(() =>this.clearUser()));
  }

}
