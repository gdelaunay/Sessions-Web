import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DatePipe, TitleCasePipe} from "@angular/common";
import {FooterComponent} from '../footer/footer.component';
import {AnimationService} from '../../services/animation.service';
import {SessionService} from '../../services/session.service';
import {RouterLink} from '@angular/router';
import {Map} from '../map/map';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sessions',
  imports: [
    FooterComponent,
    RouterLink,
    DatePipe,
    Map,
    TitleCasePipe
  ],
  templateUrl: './sessions.html'
})
export class Sessions implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('sessionCard') sessionCardsRef!: QueryList<ElementRef>;

  sessions: any[] = [];
  error: any;
  errorUrl: any;
  loading: boolean = false;

  constructor(private sessionService: SessionService,
              private animationService: AnimationService,
              private toastrService: ToastrService) {  }

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

  deleteSession(e: Event, sessionId: number){
    (e.currentTarget as HTMLButtonElement).blur();
    if(confirm("Êtes-vous sûr·e de vouloir supprimer la session ?")) {
      this.sessionService.deleteSession(sessionId).subscribe({
        next: () => {
          this.ngOnInit();
          this.toastrService.success(" La session a été supprimée.")
        },
        error: (err) => { this.toastrService.error(err.message) }
      })
    }
  }

  ngOnDestroy(){
    this.sessionCardsRef.forEach(ref => {
      this.animationService.clearAnimation(ref.nativeElement);
    });
  }

}
