import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FooterComponent} from '../../footer/footer.component';

@Component({
  selector: 'app-spot-detail',
  imports: [
    NgIf,
    FooterComponent
  ],
  templateUrl: './spot-detail.component.html'
})
export class SpotDetailComponent {

}
