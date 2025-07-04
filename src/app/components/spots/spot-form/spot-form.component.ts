import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FooterComponent} from '../../footer/footer.component';

@Component({
  selector: 'app-spot-form',
  imports: [
    NgIf,
    FooterComponent
  ],
  templateUrl: './spot-form.component.html'
})
export class SpotFormComponent {

}
