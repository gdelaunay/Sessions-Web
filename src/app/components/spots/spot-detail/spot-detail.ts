import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SpotService} from '../../../services/spot.service';
import {Map} from '../../map/map';
import {ForecastComponent} from '../../forecast/forecast.component';
import {ForecastService} from '../../../services/forecast.service';
import {AnimationService} from '../../../services/animation.service';
import {ToastrService} from 'ngx-toastr';

type ErrorType = 'spot' | 'forecast';

@Component({
  selector: 'app-spot-detail',
  imports: [
    RouterLink,
    Map,
    ForecastComponent
  ],
  templateUrl: './spot-detail.html'
})
export class SpotDetail implements OnInit, AfterViewInit {
  spotId: any;
  spot: any;
  forecasts: any;
  errorSpot: any = null;
  errorUrlSpot: any;
  loadingSpot: boolean = false;
  errorForecast: any = null;
  errorUrlForecast: any;
  loadingForecast: boolean = false;

  @ViewChildren('forecastCard') forecastCardsRef!: QueryList<ElementRef>;

  constructor(private spotService: SpotService,
              private forecastService: ForecastService,
              private animationService: AnimationService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe( params => this.spotId = params['id']);
  }

  ngOnInit() {
    if (!isNaN(Number(this.spotId))) {
      this.loadingSpot = true;
      this.spotService.getSpotById(this.spotId)
        .subscribe({
          next: (data) => {
            this.spot = data;
            this.loadingSpot = false;
            this.getSpotForecast();
          },
          error: (err) => { this.showError(err, 'spot') }
        });
    }
  }

  getSpotForecast(){
    this.loadingForecast = true;
    this.forecastService.getForecast3Hourly(this.spot.Latitude, this.spot.Longitude)
      .subscribe({
        next: (data) => {
          this.forecasts = data;
          this.loadingForecast = false;
        },
        error: (err) => { this.showError(err, 'forecast') }
      });
  }

  ngAfterViewInit(){

    this.forecastCardsRef.forEach(ref => {
      this.animationService.startAnimation(ref.nativeElement, 'idle-hover');
    });

    this.forecastCardsRef.changes.subscribe((refs: QueryList<ElementRef>) => {
      refs.forEach(ref => {
        this.animationService.startAnimation(ref.nativeElement, 'idle-hover');
      });
    });

  }

  deleteSpot(e: Event){
    (e.currentTarget as HTMLButtonElement).blur();
    if(confirm("Êtes-vous sûr·e de vouloir supprimer le spot \"" + this.spot.Name + "\" ?")) {
      this.spotService.deleteSpot(this.spot.Id).subscribe({
        next: () => {
          this.router.navigate(["/spots"]).then();
          this.toastrService.success(" Le spot \"" + this.spot.Name + "\" a été supprimé.")
        },
        error: (err) => { this.toastrService.error(err.message) }
      })
    }
  }

  showError(err: any, type: ErrorType) {
    if(type === 'spot') {
      console.error('Erreur :', err);
      this.errorSpot = `HTTP ${err.status} - ${err.statusText} : `;
      this.errorUrlSpot = err.url;
      this.loadingSpot = false;
    } else if(type === 'forecast') {
      console.error('Erreur :', err);
      this.errorForecast = `HTTP ${err.status} - ${err.statusText} : `;
      this.errorUrlForecast = err.url;
      this.loadingForecast = false;
    }

  }

}
