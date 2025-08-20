import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {ForecastComponent} from '../forecast/forecast.component';
import {MapComponent} from '../map/map.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  error: any;
  errorUrl: any;
  loading: boolean = false;

  login() {

  }
}
