import { Routes } from '@angular/router';
import {HomePage} from './components/home-page/home-page';
import {Spots} from './components/spots/spots';
import {SpotDetail} from './components/spots/spot-detail/spot-detail';
import {SpotForm} from './components/spots/spot-form/spot-form';
import {Sessions} from './components/sessions/sessions';
import {SessionDetail} from './components/sessions/session-detail/session-detail';
import {SessionForm} from './components/sessions/session-form/session-form';
import {GuestPage} from './components/guest-page/guest-page';
import { LoginPage } from './components/login-page/login-page';
import {RegisterPage} from './components/register-page/register-page';

export const routes: Routes = [
  { path: 'spots', component: Spots },
  { path: 'spot/:id', component: SpotDetail },
  { path: 'spot/form/:param', component: SpotForm },
  { path: 'sessions', component: Sessions },
  { path: 'session/:id', component: SessionDetail },
  { path: 'session/form/:param', component: SessionForm },
  { path: 'guest', component: GuestPage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: '', component: HomePage }
];
