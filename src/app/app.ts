import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AnimationService} from './services/animation.service';
import {filter, skip} from 'rxjs';
import {FooterComponent} from './components/footer/footer.component';
import {IdentityService} from './services/identity.service';
import {ToastrService} from 'ngx-toastr';

const sessionsApiUrl_DEV = 'http://localhost:5050/api';
const sessionsApiUrl_HTTP = 'http://localhost/api';
const sessionsApiUrl_HTTPS = 'https://mydomain.com/api';

export const sessionsApiUrl: string = sessionsApiUrl_HTTP;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, RouterLink],
  templateUrl: './app.html',
  standalone: true
})

export class App implements  OnInit, AfterViewInit, OnDestroy {
  title = 'Sessions-Web';

  constructor(public identityService: IdentityService, private animationService: AnimationService, private toastrService: ToastrService, public router: Router) {}

  ngOnInit() {

    this.checkIdentity();

    // Affichage spécifique quand zoom navigateur > 150% (desktop ou mobile/tablette paysage)
    window.addEventListener('resize', () => {
      if (window.devicePixelRatio > 1.5) {
        document.documentElement.classList.add('zoomed');
      } else {
        document.documentElement.classList.remove('zoomed');
      }
    });

    // Déclenchement des animations, et de la mise en évidence de la page actuelle
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), skip(1))
      .subscribe(() => {
        // Redirection si utilisateur non connecté et page protégée
        if(!this.identityService.currentUser() && !["/login", "/standalone", "/register"].includes(this.getCurrentPage())){
          this.router.navigate(['/login'], { replaceUrl: true }).then();
        }
        this.ngAfterViewInit()
      });

    // Déclenchement d'une déconnexion en quittant le site, selon l'option "rememberMe" du login
    window.addEventListener('beforeunload', () => {
      if (!this.identityService.rememberMe()) {
        this.identityService.clearUser();
        navigator.sendBeacon(`${sessionsApiUrl}/logout`, new Blob([JSON.stringify({})], { type: 'application/json' }));
      }
    });

  }

  ngAfterViewInit() {
    // Style des boutons aside selon l'URL
    this.highlightCurrentPage();

    // Animation 3D et hover des cartes principales
    setTimeout(() => {
      const mainCards = document.querySelectorAll('.card.main-card');
      mainCards.forEach(card => this.animationService.startAnimation(card as HTMLElement, 'idle-hover'));
    });
  }

  highlightCurrentPage(){
    const path = window.location.pathname;

    const routes = [
      { path: '/spot', id: 'spotsBtn' },
      { path: '/alert', id: 'alertsBtn' },
      { path: '/session', id: 'sessionsBtn' },
      { path: '/standalone', id: 'standaloneBtn' },
      { path: '/', id: 'homeBtn' }
    ];

    routes.forEach(route => {
      document.getElementById(route.id)?.classList.remove('active');
    });

    const match = routes.find(route => path.startsWith(route.path));
    if (match) {
      document.getElementById(match.id)?.classList.add('active');
    }
  }

  getCurrentPage(): string {
    return this.router.url;
  }

  checkIdentity() {
    this.identityService.getUser().subscribe({
      next: () => this.identityService.setRememberMe(true),
      error: () => this.router.navigate(['/login']).then()
    });
  }

  logout() {
    this.identityService.logout().subscribe({
      next: () => {
        this.toastrService.success("Déconnexion réussie.");
      },
      error: err => { this.toastrService.error("La déconnexion a échoué : " + err.message) }
    });
  }

  ngOnDestroy() {
    const mainCards = document.querySelectorAll('.card:not([class*=" "])');
    mainCards.forEach(card => this.animationService.clearAnimation(card as HTMLElement));
  }

}
