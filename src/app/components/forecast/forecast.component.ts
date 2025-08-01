import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

type ForecastType = 'daily' | '3hourly' | 'guest';

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
export class ForecastComponent implements AfterViewInit, OnDestroy {
  @Input() forecasts: any;
  @Input() type: ForecastType = 'daily';

  private tableDiv!: HTMLElement;
  private updateMask = () => {
    const maxScrollLeft = this.tableDiv.scrollWidth - this.tableDiv.clientWidth;
    if (maxScrollLeft <= 0) {
      this.tableDiv.style.maskImage = 'none';
      return;
    }
    if (this.tableDiv.scrollLeft === 0) {
      this.tableDiv.style.maskImage =
        'linear-gradient(to right, black 0%, black 95%, transparent 100%)';
    } else if (this.tableDiv.scrollLeft >= maxScrollLeft - 1) {
      this.tableDiv.style.maskImage =
        'linear-gradient(to right, transparent 0%, black 5%, black 100%)';
    } else {
      this.tableDiv.style.maskImage =
        'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)';
    }
  };

  ngAfterViewInit() {
    this.tableDiv = document.querySelector('.table-div') as HTMLElement;
    this.tableDiv.addEventListener('scroll', this.updateMask);
    window.addEventListener('resize', this.updateMask);
    this.updateMask();
  }

  ngOnDestroy() {
    if (this.tableDiv) {
      this.tableDiv.removeEventListener('scroll', this.updateMask);
    }
    window.removeEventListener('resize', this.updateMask);
  }
}
