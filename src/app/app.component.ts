import {AfterViewInit, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

export const sessionApiUrl: string = 'http://localhost:5038/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
  title = 'SurfSessions-Web';

  ngAfterViewInit() {
    /*
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

     */
  }

}
