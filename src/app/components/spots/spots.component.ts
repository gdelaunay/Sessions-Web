import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FooterComponent} from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import {SpotService} from '../../services/spot.service';
import {RouterLink} from '@angular/router';
import {AnimationService} from '../../services/animation.service';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-spots',
  imports: [
    FooterComponent,
    RouterLink,
    MapComponent
  ],
  templateUrl: './spots.component.html'
})

export class SpotsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('spotCard') spotCardsRef!: QueryList<ElementRef>;

  spots: any[] = [];
  error: any;
  errorUrl: any;
  loading: boolean = false;

  constructor(private http: HttpClient, private spotService: SpotService, private animationService: AnimationService) {  }

  ngOnInit(){
  this.error = null;
  this.loading = true;
  this.spotService.getSpots()
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

  ngAfterViewInit(){
    this.spotCardsRef.forEach(ref => {
      this.animationService.startAnimation(ref.nativeElement, 'idle');
    });

    this.spotCardsRef.changes.subscribe((refs: QueryList<ElementRef>) => {
      refs.forEach(ref => {
        this.animationService.startAnimation(ref.nativeElement, 'idle');
      });
    });
  }

  refreshSpots(e: Event) {
    (e.currentTarget as HTMLButtonElement).blur();
    this.ngOnInit();
  }

  ngOnDestroy(){
    this.spotCardsRef.forEach(ref => {
      this.animationService.clearAnimation(ref.nativeElement);
    });
  }
}
