import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from '../footer/footer.component';
import {HttpClient} from '@angular/common/http';
import {AnimationService} from '../../services/animation.service';
import {SessionService} from '../../services/session.service';
import {RouterLink} from '@angular/router';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-sessions',
  imports: [
    FooterComponent,
    RouterLink,
    DatePipe,
    MapComponent
  ],
  templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('sessionCard') sessionCardsRef!: QueryList<ElementRef>;

  sessions: any[] = [];
  error: any;
  errorUrl: any;
  loading: boolean = false;

  constructor(private http: HttpClient, private sessionService: SessionService, private animationService: AnimationService) {  }

  ngOnInit(){
    this.error = null;
    this.loading = true;
    this.sessionService.getSessions()
      .subscribe({
        next: (data) => {
          this.sessions = data;
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
    this.sessionCardsRef.forEach(ref => {
      this.animationService.startAnimation(ref.nativeElement, 'idle');
    });

    this.sessionCardsRef.changes.subscribe((refs: QueryList<ElementRef>) => {
      refs.forEach(ref => {
        this.animationService.startAnimation(ref.nativeElement, 'idle');
      });
    });
  }

  refreshSessions(e: Event) {
    (e.currentTarget as HTMLButtonElement).blur();
    this.ngOnInit();
  }

  ngOnDestroy(){
    this.sessionCardsRef.forEach(ref => {
      this.animationService.clearAnimation(ref.nativeElement);
    });
  }

}
