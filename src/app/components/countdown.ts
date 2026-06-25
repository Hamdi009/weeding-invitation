import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full py-20 px-4 bg-gradient-to-b from-warm-cream to-beige flex flex-col items-center justify-center">
      <!-- Background Ornament Vector (Stylized Laurel) -->
      <div class="absolute text-gold-200/10 text-9xl pointer-events-none select-none font-serif -top-8">❦</div>

      <div class="relative max-w-4xl w-full text-center space-y-8">
        <!-- Title -->
        <div class="space-y-2">
          <span class="font-display text-xs tracking-[0.3em] text-gold-600 uppercase block">The Journey Together Begins In</span>
          <h2 class="font-serif italic text-4xl text-stone-800 tracking-wide">Countdown to Our Wedding Day</h2>
          <div class="w-16 h-[1.5px] bg-gold-400/35 mx-auto mt-4"></div>
        </div>

        <!-- Countdown Columns -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto pt-6">
          <!-- Days -->
          <div class="glass-luxury rounded-sm border border-gold-300/30 p-6 md:p-8 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-[1.02]">
            <span class="font-display text-4xl md:text-5xl lg:text-6xl text-gold-500 font-semibold tracking-tight tabular-nums">
              {{ days() }}
            </span>
            <span class="font-display text-[10px] md:text-xs tracking-[0.2em] text-stone-400 uppercase mt-2">Days</span>
          </div>

          <!-- Hours -->
          <div class="glass-luxury rounded-sm border border-gold-300/30 p-6 md:p-8 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-[1.02]">
            <span class="font-display text-4xl md:text-5xl lg:text-6xl text-gold-500 font-semibold tracking-tight tabular-nums">
              {{ hours() }}
            </span>
            <span class="font-display text-[10px] md:text-xs tracking-[0.2em] text-stone-400 uppercase mt-2">Hours</span>
          </div>

          <!-- Minutes -->
          <div class="glass-luxury rounded-sm border border-gold-300/30 p-6 md:p-8 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-[1.02]">
            <span class="font-display text-4xl md:text-5xl lg:text-6xl text-gold-500 font-semibold tracking-tight tabular-nums">
              {{ minutes() }}
            </span>
            <span class="font-display text-[10px] md:text-xs tracking-[0.2em] text-stone-400 uppercase mt-2">Minutes</span>
          </div>

          <!-- Seconds -->
          <div class="glass-luxury rounded-sm border border-gold-300/30 p-6 md:p-8 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-[1.02]">
            <span class="font-display text-4xl md:text-5xl lg:text-6xl text-gold-500 font-semibold tracking-tight tabular-nums">
              {{ seconds() }}
            </span>
            <span class="font-display text-[10px] md:text-xs tracking-[0.2em] text-stone-400 uppercase mt-2">Seconds</span>
          </div>
        </div>

        <!-- Venue Note -->
        <p class="font-serif italic text-stone-500 text-sm max-w-md mx-auto pt-4 leading-relaxed">
          Sbiba, Tunisia • June 25, 2027, at 04:00 PM
        </p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CountdownComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private timerId: ReturnType<typeof setInterval> | null = null;

  // Countdown values represented as signals
  days = signal('00');
  hours = signal('00');
  minutes = signal('00');
  seconds = signal('00');

  // Wedding Date: June 25, 2027 16:00:00 (Tunis is UTC+1, let's create simple absolute target)
  private targetTime = new Date('2027-06-25T16:00:00').getTime();

  ngOnInit() {
    // Only run interval inside browser environment to support SSR gracefully
    if (isPlatformBrowser(this.platformId)) {
      this.updateCountdown();
      this.timerId = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetTime - now;

    if (distance < 0) {
      this.days.set('00');
      this.hours.set('00');
      this.minutes.set('00');
      this.seconds.set('00');
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.days.set(this.padZero(d));
    this.hours.set(this.padZero(h));
    this.minutes.set(this.padZero(m));
    this.seconds.set(this.padZero(s));
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
