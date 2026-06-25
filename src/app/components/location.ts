import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-location',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full py-24 px-4 bg-warm-cream">
      <div class="max-w-5xl mx-auto space-y-16">
        
        <!-- Section Title -->
        <div class="text-center space-y-3">
          <span class="font-display text-xs tracking-[0.3em] text-gold-600 uppercase block">Where & When</span>
          <h2 class="font-serif italic text-4xl text-stone-800 tracking-wide">The Venue & Details</h2>
          <div class="w-16 h-[1.5px] bg-gold-400/35 mx-auto mt-4"></div>
          <p class="font-serif italic text-stone-500 text-sm max-w-md mx-auto pt-2">Our celebration will be hosted in the beautiful and historic city of Sbiba, Tunisia.</p>
        </div>

        <!-- Venue Information Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Text Details -->
          <div class="space-y-8">
            
            <!-- Main Location Card -->
            <div class="glass-luxury p-8 rounded-sm border border-gold-300/30 shadow-lg relative overflow-hidden">
              <div class="absolute -right-4 -bottom-4 text-gold-200/5 text-8xl font-serif pointer-events-none">✦</div>
              <div class="flex items-start gap-4">
                <div class="p-3 bg-neutral-900 rounded-full border border-gold-400/30 flex items-center justify-center">
                  <mat-icon class="text-gold-300">place</mat-icon>
                </div>
                <div class="space-y-2">
                  <h3 class="font-display text-xs tracking-[0.2em] text-gold-600 uppercase font-semibold">The Wedding Estate</h3>
                  <p class="font-serif text-xl font-bold text-stone-800">Espace Ryadh Sbiba</p>
                  <p class="font-serif text-stone-600 text-sm leading-relaxed">
                    Rue de l'Indépendance, Sbiba,<br>
                    Kasserine 1270, Tunisia
                  </p>
                </div>
              </div>
            </div>

            <!-- Accommodations -->
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                <mat-icon class="text-gold-500">local_hotel</mat-icon>
                <h4 class="font-display text-xs tracking-[0.15em] text-stone-800 uppercase font-semibold">Where to Stay</h4>
              </div>
              <p class="font-serif text-stone-600 text-sm leading-relaxed">
                For our traveling family and friends, we highly recommend the following beautiful accommodations located in the region:
              </p>
              <ul class="space-y-2.5 pl-1.5">
                <li class="flex items-center gap-3">
                  <span class="text-gold-500 text-xs">✦</span>
                  <span class="font-serif text-sm text-stone-700"><strong>Hôtel Sufetula</strong> — Sbeitla Archeological Center</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-gold-500 text-xs">✦</span>
                  <span class="font-serif text-sm text-stone-700"><strong>Dar El Kasba</strong> — Kasserine Heritage Guesthouse</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-gold-500 text-xs">✦</span>
                  <span class="font-serif text-sm text-stone-700"><strong>Hotel Cillium</strong> — Kasserine City Resort</span>
                </li>
              </ul>
            </div>

            <!-- Dress Code Card -->
            <div class="p-6 bg-gold-50 border border-gold-200 rounded-sm flex items-start gap-4 mt-4 md:mt-6">
              <mat-icon class="text-gold-600">checkroom</mat-icon>
              <div class="space-y-1">
                <h4 class="font-display text-[10px] tracking-[0.2em] text-gold-700 uppercase font-bold">Dress Code</h4>
                <p class="font-serif text-xs text-stone-600 leading-relaxed">
                  <strong>Black Tie Optional:</strong> We invite our beloved guests to dress in formal elegance. Our color theme embraces soft shades of <strong>Ivory, Champagne Gold, Soft Beige, and Cream</strong> to match the romantic rustic backdrop.
                </p>
              </div>
            </div>

          </div>

          <!-- Interactive Map Container -->
          <div class="relative w-full aspect-square md:aspect-[4/5] rounded-sm overflow-hidden border border-gold-300/40 shadow-2xl bg-neutral-900 group">
            <!-- Glassmorphism absolute tag -->
            <div class="absolute top-4 left-4 z-10 bg-neutral-900/90 backdrop-blur-md border border-gold-500/35 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span class="font-display text-[9px] tracking-widest text-gold-300 uppercase">Interactive Map</span>
            </div>
            
            <!-- Map Iframe with styling -->
            <iframe 
              src="https://maps.google.com/maps?q=Sbiba,Kasserine,Tunisia&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              class="w-full h-full border-none filter contrast-[1.05] brightness-95"
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
export class LocationComponent {}
