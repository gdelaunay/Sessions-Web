import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-account-page',
  imports: [
    FooterComponent,
    FormsModule
  ],
  templateUrl: './new-account-page.html'
})
export class NewAccountPage {
  error: any;
  errorUrl: any;
  loading: boolean = false;

  login() {

  }
}
