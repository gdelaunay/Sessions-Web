import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-spots',
  imports: [
    NgIf,
    FooterComponent
  ],
  templateUrl: './spots.component.html'
})
export class SpotsComponent {

}
