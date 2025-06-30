import {AfterViewInit, Component, NgZone, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  private intervalId: any;
  constructor(private ngZone: NgZone) {}
  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {
      const yearEl = document.getElementById('year');
      const datetimeEl = document.getElementById('datetime');

      if (yearEl && datetimeEl) {
        const now = new Date();
        yearEl.textContent = now.getFullYear().toString();
        datetimeEl.textContent = now.toLocaleString();

        this.intervalId = setInterval(() => {
          datetimeEl.textContent = new Date().toLocaleString();
        }, 1000);
      }
    })
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
