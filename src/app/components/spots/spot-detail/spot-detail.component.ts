import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NgIf} from "@angular/common";
import {FooterComponent} from '../../footer/footer.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SpotService} from '../../../services/spot.service';
import {MapComponent} from '../../map/map.component';
import {ForecastComponent} from '../../forecast/forecast.component';
import {ForecastService} from '../../../services/forecast.service';
import {AnimationService} from '../../../services/animation.service';
import {ToastrService} from 'ngx-toastr';

type ErrorType = 'spot' | 'forecast';

@Component({
  selector: 'app-spot-detail',
  imports: [
    NgIf,
    FooterComponent,
    RouterLink,
    MapComponent,
    ForecastComponent
  ],
  templateUrl: './spot-detail.component.html'
})
export class SpotDetailComponent implements OnInit, AfterViewInit {
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
      // TODO : fix delete
      this.spotService.deleteSpot(this.spot.Id).subscribe({
        next: (res) => {
          this.router.navigate(["/spot"]);
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
