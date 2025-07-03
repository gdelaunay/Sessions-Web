import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SpotsComponent} from './components/spots/spots.component';
import {SpotDetailComponent} from './components/spots/spot-detail/spot-detail.component';
import {SpotFormComponent} from './components/spots/spot-form/spot-form.component';
import {SessionsComponent} from './components/sessions/sessions.component';
import {SessionDetailComponent} from './components/sessions/session-detail/session-detail.component';
import {SessionFormComponent} from './components/sessions/session-form/session-form.component';

export const routes: Routes = [
  { path: 'spots', component: SpotsComponent },
  { path: 'spot/:id', component: SpotDetailComponent },
  { path: 'spot/form/:param', component: SpotFormComponent },
  { path: 'sessions', component: SessionsComponent },
  { path: 'session/:id', component: SessionDetailComponent },
  { path: 'session/form/:param', component: SessionFormComponent },
  { path: '', component: HomeComponent }
];
