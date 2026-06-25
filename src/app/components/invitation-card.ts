import { ChangeDetectionStrategy, Component, signal, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invitation-card',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full py-16 px-4 md:px-8 flex flex-col items-center justify-center min-h-[90vh] bg-warm-cream">
      <!-- Luxury Background Pattern -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#b58d24_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <!-- Main Invitation Card Frame -->
      <div 
        class="relative w-full max-w-2xl px-6 py-16 md:px-12 md:py-20 bg-ivory rounded-sm shadow-2xl border border-gold-300/40 text-center flex flex-col items-center select-none overflow-hidden transition-all duration-[1200ms] transform"
        [class.translate-y-0]="isLoaded()"
        [class.opacity-100]="isLoaded()"
        [class.translate-y-8]="!isLoaded()"
        [class.opacity-0]="!isLoaded()"
      >
        <!-- Fine Double Gold Borders -->
        <div class="absolute inset-4 border border-gold-300/20 rounded-sm pointer-events-none"></div>
        <div class="absolute inset-5 border border-gold-400/40 rounded-sm pointer-events-none"></div>

        <!-- Corner Ornaments -->
        <div class="absolute top-6 left-6 text-gold-400/50 text-xl font-serif pointer-events-none select-none">✥</div>
        <div class="absolute top-6 right-6 text-gold-400/50 text-xl font-serif pointer-events-none select-none">✥</div>
        <div class="absolute bottom-6 left-6 text-gold-400/50 text-xl font-serif pointer-events-none select-none">✥</div>
        <div class="absolute bottom-6 right-6 text-gold-400/50 text-xl font-serif pointer-events-none select-none">✥</div>

        <!-- Header Callout -->
        <div 
          class="transition-all duration-1000 delay-300 transform"
          [class.translate-y-0]="namesVisible()"
          [class.opacity-100]="namesVisible()"
          [class.translate-y-4]="!namesVisible()"
          [class.opacity-0]="!namesVisible()"
        >
          <span class="font-display text-[11px] md:text-xs tracking-[0.3em] text-gold-600 uppercase block mb-6">
            The Honor of Your Presence is Requested
          </span>
        </div>

        <!-- The Names (Calligraphy / Cursive Font) -->
        <div 
          class="my-4 transition-all duration-1000 delay-500 transform"
          [class.scale-100]="namesVisible()"
          [class.opacity-100]="namesVisible()"
          [class.scale-95]="!namesVisible()"
          [class.opacity-0]="!namesVisible()"
        >
          <h1 class="font-cursive text-6xl md:text-7xl lg:text-8xl text-gold-500 drop-shadow-sm leading-tight">
            Hamdi <span class="font-serif italic text-3xl md:text-4xl text-gold-400/80 my-1 block md:inline md:mx-4">&</span> Elaa
          </h1>
        </div>

        <!-- Decorative Floral/Ornate Separator -->
        <div 
          class="w-full max-w-xs my-8 flex items-center justify-center gap-4 transition-all duration-1000 delay-700 transform"
          [class.scale-100]="ornamentsVisible()"
          [class.opacity-100]="ornamentsVisible()"
          [class.scale-90]="!ornamentsVisible()"
          [class.opacity-0]="!ornamentsVisible()"
        >
          <div class="h-[1px] w-full bg-gradient-to-r from-transparent to-gold-400/40"></div>
          <div class="text-gold-500 text-lg select-none">❦</div>
          <div class="h-[1px] w-full bg-gradient-to-l from-transparent to-gold-400/40"></div>
        </div>

        <!-- Main Body Request -->
        <div 
          class="max-w-md space-y-4 mb-10 transition-all duration-1000 delay-900 transform"
          [class.translate-y-0]="detailsVisible()"
          [class.opacity-100]="detailsVisible()"
          [class.translate-y-4]="!detailsVisible()"
          [class.opacity-0]="!detailsVisible()"
        >
          <p class="font-serif italic text-base md:text-lg text-stone-600 leading-relaxed">
            Together with their families,<br>
            request the pleasure of your presence<br>
            at their wedding celebration.
          </p>
        </div>

        <!-- Elegant Location & Timing Details Grid -->
        <div 
          class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-lg mb-12 border-t border-b border-gold-300/20 py-8 transition-all duration-1000 delay-1100 transform"
          [class.translate-y-0]="detailsVisible()"
          [class.opacity-100]="detailsVisible()"
          [class.translate-y-4]="!detailsVisible()"
          [class.opacity-0]="!detailsVisible()"
        >
          <!-- Date -->
          <div class="flex flex-col items-center">
            <mat-icon class="text-gold-500 mb-2">event</mat-icon>
            <span class="font-display text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">Date</span>
            <span class="font-serif text-sm font-semibold text-stone-800">Friday, 25 June 2027</span>
          </div>

          <!-- Vertical Separator for Desktop -->
          <div class="hidden md:block w-[1px] h-12 bg-gold-300/20 self-center"></div>

          <!-- Time -->
          <div class="flex flex-col items-center">
            <mat-icon class="text-gold-500 mb-2">schedule</mat-icon>
            <span class="font-display text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">Time</span>
            <span class="font-serif text-sm font-semibold text-stone-800">04:00 PM (Local Time)</span>
          </div>

          <!-- Vertical Separator for Desktop -->
          <div class="hidden md:block w-[1px] h-12 bg-gold-300/20 self-center"></div>

          <!-- Location -->
          <div class="flex flex-col items-center">
            <mat-icon class="text-gold-500 mb-2">place</mat-icon>
            <span class="font-display text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1">Location</span>
            <span class="font-serif text-sm font-semibold text-stone-800">Sbiba, Tunisia</span>
          </div>
        </div>

        <!-- RSVP Button Trigger -->
        <div 
          class="transition-all duration-1000 delay-[1300ms] transform"
          [class.translate-y-0]="rsvpVisible()"
          [class.opacity-100]="rsvpVisible()"
          [class.translate-y-4]="!rsvpVisible()"
          [class.opacity-0]="!rsvpVisible()"
        >
          <button 
            (click)="scrollToRSVP()"
            class="relative inline-flex items-center gap-2 px-10 py-3.5 bg-neutral-900 text-gold-100 font-display text-xs font-semibold tracking-[0.25em] uppercase border border-gold-400/40 rounded-sm hover:bg-gold-500 hover:text-luxury-black transition-all duration-500 cursor-pointer shadow-lg hover:shadow-gold-500/10 group hover:scale-[1.03]"
          >
            <!-- Gold Shimmer Hover Element -->
            <div class="absolute inset-0 bg-gold-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <mat-icon class="text-lg">favorite</mat-icon>
            <span class="relative z-10">Kindly RSVP</span>
          </button>
          
          <p class="font-serif italic text-xs text-stone-400 mt-4">Please respond by 31 May 2027</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class InvitationCardComponent implements OnInit {
  rsvpClicked = output<void>();

  isLoaded = signal(false);
  namesVisible = signal(false);
  ornamentsVisible = signal(false);
  detailsVisible = signal(false);
  rsvpVisible = signal(false);

  ngOnInit() {
    // Staggered cinematic reveal of components on scroll/view
    setTimeout(() => {
      this.isLoaded.set(true);
    }, 100);

    setTimeout(() => {
      this.namesVisible.set(true);
    }, 500);

    setTimeout(() => {
      this.ornamentsVisible.set(true);
    }, 900);

    setTimeout(() => {
      this.detailsVisible.set(true);
    }, 1300);

    setTimeout(() => {
      this.rsvpVisible.set(true);
    }, 1700);
  }

  scrollToRSVP() {
    this.rsvpClicked.emit();
  }
}
