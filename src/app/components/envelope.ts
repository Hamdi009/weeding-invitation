import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-envelope',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-luxury-black bg-radial from-neutral-900 to-black select-none">
      <!-- Golden Particles Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        @for (p of particles; track p.id) {
          <div
            class="particle"
            [style.left.%]="p.left"
            [style.width.px]="p.size"
            [style.height.px]="p.size"
            [style.animationDelay.s]="p.delay"
            [style.animationDuration.s]="p.duration"
          ></div>
        }
      </div>

      <!-- Main Envelope Container with Zoom Out / Fade Effect on Open -->
      <div 
        class="relative flex flex-col items-center justify-center transition-all duration-[1600ms] ease-out px-4 w-full max-w-lg"
        [style.transform]="envelopeTransform()"
        [style.opacity]="envelopeOpacity()"
        [style.pointer-events]="isOpened() ? 'none' : 'auto'"
      >
        <!-- Floating Envelope Body -->
        <div 
          class="relative w-full aspect-[4/3] bg-[#b0d2ec] rounded-lg shadow-2xl border border-gold-300/20 flex items-center justify-center cursor-pointer overflow-visible group focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          [class.animate-float]="!isOpened()"
          tabindex="0"
          (click)="openEnvelope()"
          (keydown.enter)="openEnvelope()"
        >
          <!-- Front Pocket/Body of Envelope -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#d4e6f1] via-[#ebf5fb] to-[#b9d9eb] rounded-lg z-10 border border-gold-400/20 shadow-[inset_0_4px_30px_rgba(181,141,36,0.15)]"></div>

          <!-- Left Flap Diagonal -->
          <div class="absolute left-0 top-0 bottom-0 w-1/2 bg-[#c2daf0]/90 border-r border-gold-400/20 z-10" style="clip-path: polygon(0 0, 100% 50%, 0 100%);"></div>
          
          <!-- Right Flap Diagonal -->
          <div class="absolute right-0 top-0 bottom-0 w-1/2 bg-[#c5dbf2]/95 border-l border-gold-400/20 z-10" style="clip-path: polygon(100% 0, 0 50%, 100% 100%);"></div>

          <!-- Bottom Flap -->
          <div class="absolute bottom-0 left-0 right-0 h-2/3 bg-[#b0d2ec] border-t border-gold-400/20 z-12 shadow-[0_-5px_15px_rgba(0,0,0,0.4)]" style="clip-path: polygon(0 100%, 50% 0, 100% 100%);"></div>

          <!-- Envelope Top Flap (Flipped 180 degrees upwards when open) -->
          <div 
            class="absolute top-0 left-0 right-0 h-1/2 bg-[#b9daf3] border-b border-gold-400/20 shadow-md z-20 origin-top transition-all duration-[1200ms] ease-in-out"
            [style.transform]="flapTransform()"
            style="clip-path: polygon(0 0, 50% 100%, 100% 0);"
          ></div>

          <!-- Floating/Sliding Invitation Card Inside -->
          <div 
            class="absolute bg-warm-cream border border-gold-400 rounded-sm shadow-xl p-6 flex flex-col items-center justify-center transition-all duration-[1600ms] ease-in-out overflow-hidden"
            [style.width.%]="88"
            [style.height.%]="80"
            [style.zIndex]="cardZIndex()"
            [style.transform]="cardTransform()"
          >
            <!-- Card Golden Filigree Accent -->
            <div class="absolute inset-2 border border-gold-300/30 rounded-sm pointer-events-none flex flex-col justify-between p-2">
              <div class="flex justify-between w-full">
                <span class="text-gold-500/30 text-xs">✦</span>
                <span class="text-gold-500/30 text-xs">✦</span>
              </div>
              <div class="flex justify-between w-full">
                <span class="text-gold-500/30 text-xs">✦</span>
                <span class="text-gold-500/30 text-xs">✦</span>
              </div>
            </div>

            <!-- Preview Content inside envelope -->
            <div class="text-center space-y-3 z-10">
              <p class="font-display text-[10px] tracking-[0.25em] text-gold-600">THE WEDDING OF</p>
              <h1 class="font-cursive text-4xl text-gold-500 tracking-wide my-1">Hamdi & Elaa</h1>
              <div class="w-16 h-[1px] bg-gold-400/30 mx-auto"></div>
              <p class="font-serif italic text-[11px] text-stone-600">Sbiba, Tunisia</p>
              <p class="font-serif text-[10px] text-stone-500 tracking-widest">25 JUNE 2027</p>
            </div>
          </div>

          <!-- Wax Seal (Centered) -->
          <div 
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-30 transition-all duration-1000 ease-in-out select-none flex items-center justify-center"
            [style.transform]="sealTransform()"
            [style.opacity]="sealOpacity()"
          >
            <!-- Golden Wax Seal Outer Ring -->
            <div class="absolute inset-0 bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 rounded-full shadow-[0_5px_15px_rgba(181,141,36,0.5),_inset_0_2px_4px_rgba(255,255,255,0.4)] border border-gold-300/30 group-hover:scale-105 transition-transform duration-500"></div>
            <!-- Inner Ring with Intricate Monogram -->
            <div class="absolute inset-[3px] border border-dashed border-gold-100/40 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-gold-400 via-gold-600 to-gold-800">
              <span class="font-display text-[11px] font-bold text-gold-50 tracking-wider">H & E</span>
              <div class="text-[8px] text-gold-100/80 -mt-1">❦</div>
            </div>
          </div>

          <!-- Flower Fireworks Burst -->
          @for (f of flowerFireworks(); track f.id) {
            <div 
              class="flower-particle absolute"
              [style.--tx]="f.tx"
              [style.--ty]="f.ty"
              [style.--rot]="f.rot"
              [style.--scale]="f.scale"
              [style.--delay]="f.delay"
              [style.--dur]="f.dur"
            >
              <mat-icon [class]="f.color" [style.fontSize.px]="18">
                {{ f.icon }}
              </mat-icon>
            </div>
          }
        </div>

        <!-- Open Button Below Envelope -->
        <div class="mt-12 text-center transition-all duration-700" [class.opacity-0]="isOpened()">
          <p class="text-stone-400 font-serif italic text-sm tracking-widest mb-4">You have been cordially invited to celebrate love</p>
          <button 
            (click)="openEnvelope()"
            class="relative inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-luxury-black font-display font-semibold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_4px_20px_rgba(181,141,36,0.35)] hover:shadow-[0_4px_25px_rgba(181,141,36,0.55)] group hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            <!-- Shine reflection sweep -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1200ms] ease-out"></div>
            <mat-icon class="text-lg text-luxury-black">drafts</mat-icon>
            <span>Open Invitation</span>
          </button>
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
export class EnvelopeComponent {
  opened = output<void>();

  isOpened = signal(false);
  isDestroyed = signal(false);

  // Styling properties computed dynamically
  envelopeTransform = signal('translateY(0)');
  envelopeOpacity = signal(1);
  flapTransform = signal('rotateX(0deg)');
  cardZIndex = signal(5);
  cardTransform = signal('translateY(12px) scale(0.95)');
  sealTransform = signal('translate(-50%, -50%) scale(1)');
  sealOpacity = signal(1);

  // Flower Fireworks Particles Signal
  flowerFireworks = signal<{
    id: number;
    tx: string;
    ty: string;
    rot: string;
    scale: number;
    delay: string;
    dur: string;
    color: string;
    icon: string;
  }[]>([]);

  // Simple floating gold particles
  particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 10,
    duration: Math.random() * 8 + 6
  }));

  openEnvelope() {
    if (this.isOpened()) return;
    this.isOpened.set(true);

    // Create a beautiful burst of flower particles like fireworks
    const particlesArray = [];
    const colors = [
      'text-sky-300', 'text-sky-400', 'text-sky-200', 'text-blue-300',
      'text-gold-300', 'text-gold-200', 'text-white'
    ];
    const flowerIcons = ['local_florist', 'spa', 'brightness_low', 'auto_awesome'];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 120 + Math.random() * 240; 
      const tx = `${Math.cos(angle) * distance}px`;
      const ty = `${Math.sin(angle) * distance}px`;
      const rot = `${360 + Math.random() * 360}deg`;
      const scale = 0.6 + Math.random() * 0.8;
      const delay = `${Math.random() * 0.25}s`;
      const dur = `${1.2 + Math.random() * 1.2}s`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const icon = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];

      particlesArray.push({
        id: i,
        tx,
        ty,
        rot,
        scale,
        delay,
        dur,
        color,
        icon
      });
    }
    this.flowerFireworks.set(particlesArray);

    // Cinematic Timing Sequence
    // 1. Break the seal & fade it out slowly
    this.sealTransform.set('translate(-50%, -50%) scale(1.3) rotate(15deg)');
    this.sealOpacity.set(0);

    // 2. Flip open the envelope flap (Realistic 3D look)
    setTimeout(() => {
      this.flapTransform.set('rotateX(180deg) translateY(-2px)');
    }, 400);

    // 3. Slide the envelope down and slide the card up by the same amount, keeping it in the center of the viewport
    setTimeout(() => {
      this.cardZIndex.set(35);
      this.envelopeTransform.set('translateY(22vh)');
      this.cardTransform.set('translateY(-22vh) scale(1.18)');
    }, 1100);

    // 4. Zoom the card in to fill the viewport (Full Screen Transition)
    setTimeout(() => {
      this.cardTransform.set('translateY(-22vh) scale(3.5)');
      this.envelopeOpacity.set(0);
    }, 3200);

    // 5. Unveil the main scrollable wedding invitation website
    setTimeout(() => {
      this.opened.emit();
    }, 4500);
  }
}
