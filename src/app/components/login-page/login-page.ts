import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './login-page.html'
})
export class LoginPage {
  error: any;
  errorUrl: any;
  loading: boolean = false;

  login() {

  }
}
