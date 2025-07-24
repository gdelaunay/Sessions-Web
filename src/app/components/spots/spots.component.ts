import {Component, Host, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import {SpotsService} from '../../services/spots.service';
import {RouterLink} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-spots',
  imports: [
    NgIf,
    FooterComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './spots.component.html'
})

export class SpotsComponent implements OnInit {

  spots: any[] = [];
  error: any;
  errorUrl: any;
  loading: boolean = false;

  constructor(private http: HttpClient, private spotsService: SpotsService) {  }

  ngOnInit(){
    this.loading = true;
    this.spotsService.getSpots()
      .subscribe({
        next: (data) => {
          this.spots = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erreur :', err);
          this.error = `HTTP ${err.status} - ${err.statusText} : `;
          this.errorUrl = err.url;
          this.loading = false;
        }
      });
  }

  refreshSpots(e: Event) {
    (e.currentTarget as HTMLButtonElement).blur();
    this.ngOnInit();
  }

}
