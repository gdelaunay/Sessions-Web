import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';

const sessionsApiUrl_DEV = 'http://localhost:5050/api';
const sessionsApiUrl_HTTP = 'http://localhost/api';
const sessionsApiUrl_HTTPS = 'https://mydomain.com/api';
const mySessionsApiUrl_HTTPS = 'https://sessions.gdelaunay.fr/api';

export const sessionsApiUrl: string = sessionsApiUrl_HTTP;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: "<router-outlet/>"
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'SurfSessions-Web';
  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.checkZoom()
    window.addEventListener('resize', this.checkZoom);
  }

  // Affichage spécifique quand zoom navigateur > 150% (desktop)
  checkZoom () {
    if (window.devicePixelRatio > 1.5) {
      document.documentElement.classList.add('zoomed');
    } else {
      document.documentElement.classList.remove('zoomed');
    }
  }

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {

      // Style des boutons aside selon l'URL
      const path = window.location.pathname;

      const routes = [
        { path: '/spots', id: 'spotsBtn' },
        { path: '/alerts', id: 'alertsBtn' },
        { path: '/sessions', id: 'sessionsBtn' },
        { path: '/guest', id: 'guestBtn' },
        { path: '/', id: 'homeBtn' }
      ];
      const match = routes.find(route => path.startsWith(route.path));

      if (match) {
        document.getElementById(match.id)?.classList.add('active');
      }

      // Animation 3D de la carte/container principal
      setTimeout(() => {
        let cards = document.getElementsByClassName('card');
        if (cards.length == 0) return;

        // Animation inactivité
        let animationFrame: number = 0;

        function startIdleAnimation(card: HTMLElement) {
          let angle = 0;
          function animate() {

            angle += 0.01;
            const rotX = Math.sin(angle) * 5;
            const rotY = Math.cos(angle) * 5;
            const translateY = Math.sin(angle) * 7.5;

            card.style.transform = `translateY(${translateY}px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;

            animationFrame = requestAnimationFrame(animate);
          }
          animate();
        }
        function stopIdleAnimation() {
          cancelAnimationFrame(animationFrame);
        }

        // Animation interaction avec la souris
        for (var i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;

          startIdleAnimation(card);

          card.addEventListener('mousemove', (e) => {
            stopIdleAnimation();
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotX = y * 10;
            const rotY = x * 10;
            card.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
          });

          card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            startIdleAnimation(card);
          });
        }
      }, 0);
    });
  }
}
