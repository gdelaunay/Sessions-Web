import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './register-page.html'
})
export class RegisterPage {
  error: any;
  errorUrl: any;
  loading: boolean = false;

  login() {

  }
}
