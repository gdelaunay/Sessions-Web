import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, KeyValuePipe, TitleCasePipe} from '@angular/common';

type ForecastType = 'daily' | '3hourly' | 'standalone';

@Component({
  selector: 'app-forecast',
  imports: [
    KeyValuePipe,
    DatePipe,
    TitleCasePipe
  ],
  standalone: true,
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() forecasts: any;
  @Input() type: ForecastType = 'daily';

  public groupedForecasts: { [date: string]: any[] } = {};
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

  ngOnInit(){
    if (this.type === '3hourly') {
      this.groupedForecasts = this.forecasts?.reduce((acc: any, item: any) => {
        const date = item.DateTime.slice(0, 10);
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
      }, {}) || {};
    }
  }

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

  protected readonly Object = Object;
}
