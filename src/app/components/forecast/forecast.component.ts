import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-forecast',
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {
  @Input() forecasts: any;
  @Input() type: any;
}
