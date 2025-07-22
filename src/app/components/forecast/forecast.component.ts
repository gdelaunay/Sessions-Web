import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
export class ForecastComponent implements AfterViewInit {
  @Input() forecasts: any;
  @Input() type: any;

  ngAfterViewInit() {
    const tableDiv = document.querySelector('.table-div') as HTMLElement;

    function updateMask() {
      const maxScrollLeft = tableDiv.scrollWidth - tableDiv.clientWidth;

      if (tableDiv.scrollLeft === 0) {
        tableDiv.style.maskImage =
            'linear-gradient(to right, black 0%, black 95%, transparent 100%)';
      } else if (tableDiv.scrollLeft >= maxScrollLeft - 1) {
        tableDiv.style.maskImage =
            'linear-gradient(to right, transparent 0%, black 5%, black 100%)';
      } else {
        tableDiv.style.maskImage =
            'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)';
      }
    }

    tableDiv.addEventListener('scroll', updateMask);
    window.addEventListener('resize', updateMask);
    updateMask();
  }
}
