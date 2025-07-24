import {Injectable, NgZone } from '@angular/core';

type AnimationType = 'idle' | 'idle-hover' | 'custom';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private idleRunning = new WeakSet<HTMLElement>();
  private animationFrames = new WeakMap<HTMLElement, number>();
  private listeners = new WeakMap<HTMLElement, {
    mousemove?: EventListener;
    mouseleave?: EventListener;
    mouseover?: EventListener;
  }>();

  constructor(private ngZone: NgZone) {}

  startAnimation(card: HTMLElement, type: AnimationType) {
    this.clearAnimation(card);

    if (type === 'idle') {
      this.startIdleAnimation(card);
      this.attachIdleListeners(card);
    }

    if (type === 'idle-hover') {
      this.startIdleAnimation(card);
      this.attachIdleHoverListeners(card);
    }

    if (type === 'custom') {

    }
  }

  private startIdleAnimation(card: HTMLElement) {
    if (this.idleRunning.has(card)) return;
    this.idleRunning.add(card);

    this.ngZone.runOutsideAngular(() => {
      let angle = 0;

      const animate = () => {
        angle += 0.01;
        const rotX = Math.sin(angle) * 5;
        const rotY = Math.cos(angle) * 5;
        const translateY = Math.sin(angle) * 7.5;

        card.style.transform = `translateY(${translateY}px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
        const frame = requestAnimationFrame(animate);
        this.animationFrames.set(card, frame);
      };
      animate();
    });
  }

  private attachIdleListeners(card: HTMLElement) {
    this.ngZone.runOutsideAngular(() => {
      const onMouseOver = () => {
        this.stopIdleAnimation(card);
      };

      const onMouseLeave = () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        this.startIdleAnimation(card);
      };

      card.addEventListener('mouseover', onMouseOver);
      card.addEventListener('mouseleave', onMouseLeave);

      this.listeners.set(card, { mouseover: onMouseOver, mouseleave: onMouseLeave });
    });
  }

  private attachIdleHoverListeners(card: HTMLElement) {
    this.ngZone.runOutsideAngular(() => {
      const onMouseMove = ((e: MouseEvent) => {
        this.stopIdleAnimation(card);

        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotX = y * 10;
        const rotY = x * 10;
        card.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
      }) as EventListener;

      const onMouseLeave = () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        this.startIdleAnimation(card);
      };

      const onMouseOver = () => {
        this.stopIdleAnimation(card);
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
      card.addEventListener('mouseover', onMouseOver);

      this.listeners.set(card, { mousemove: onMouseMove, mouseleave: onMouseLeave, mouseover: onMouseOver });
    });
  }

  private stopIdleAnimation(card: HTMLElement) {
    const frame = this.animationFrames.get(card);
    if (frame) {
      cancelAnimationFrame(frame);
      this.animationFrames.delete(card);
    }
    this.idleRunning.delete(card);
  }

  clearAnimation(card: HTMLElement) {
    this.stopIdleAnimation(card);

    const handlers = this.listeners.get(card);
    if (handlers) {
      if (handlers.mousemove) card.removeEventListener('mousemove', handlers.mousemove);
      if (handlers.mouseleave) card.removeEventListener('mouseleave', handlers.mouseleave);
      if (handlers.mouseover) card.removeEventListener('mouseover', handlers.mouseover);
      this.listeners.delete(card);
    }

    card.style.transform = '';
  }
}
