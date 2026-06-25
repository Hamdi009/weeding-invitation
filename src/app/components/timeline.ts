import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-timeline',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full py-24 px-4 bg-warm-cream overflow-hidden">
      <!-- Ornaments in background -->
      <div class="absolute right-0 top-1/4 text-gold-200/10 text-9xl pointer-events-none select-none font-serif">❦</div>
      <div class="absolute left-0 bottom-1/4 text-gold-200/10 text-9xl pointer-events-none select-none font-serif">✦</div>

      <div class="max-w-4xl mx-auto">
        <!-- Title Block -->
        <div class="text-center space-y-3 mb-20">
          <span class="font-display text-xs tracking-[0.3em] text-gold-600 uppercase block">The Celebration Schedule</span>
          <h2 class="font-serif italic text-4xl text-stone-800 tracking-wide">Wedding Timeline</h2>
          <div class="w-16 h-[1.5px] bg-gold-400/35 mx-auto mt-4"></div>
          <p class="font-serif italic text-stone-500 text-sm max-w-md mx-auto pt-2">Join us in celebrating every precious moment of our special day.</p>
        </div>

        <!-- Vertical Timeline Path -->
        <div class="relative">
          <!-- Central Line -->
          <div class="absolute left-6 md:left-1/2 top-2 bottom-2 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300/10"></div>

          <!-- Timeline Items -->
          <div class="space-y-12 md:space-y-16">
            @for (event of timelineEvents; track event.time; let idx = $index; let isEven = $even) {
              <div class="relative flex flex-col md:flex-row items-start md:items-center justify-between">
                
                <!-- Dot / Icon Marker -->
                <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-stone-900 to-neutral-950 border border-gold-400 flex items-center justify-center z-10 shadow-[0_4px_10px_rgba(181,141,36,0.3)] transition-transform duration-300 hover:scale-110">
                  <mat-icon class="text-gold-300 text-lg">{{ event.icon }}</mat-icon>
                </div>

                <!-- Left Side Content (Hidden on mobile for Even, used for details on desktop Even, and time on desktop Odd) -->
                <div class="hidden md:block md:w-[42%] md:text-right">
                  @if (isEven) {
                    <!-- Details Card for Even -->
                    <div class="glass-luxury rounded-sm border border-gold-300/25 p-6 hover:shadow-xl hover:border-gold-400/50 transition-all duration-300 transform hover:-translate-y-1 text-right">
                      <span class="font-display text-xs text-gold-500 font-semibold tracking-widest block mb-1">{{ event.time }}</span>
                      <h3 class="font-serif text-lg font-bold text-stone-800 mb-2">{{ event.title }}</h3>
                      <p class="font-serif text-stone-600 text-sm leading-relaxed">{{ event.description }}</p>
                    </div>
                  } @else {
                    <!-- Time for Odd -->
                    <span class="font-display text-2xl font-semibold tracking-[0.1em] text-gold-600 font-serif italic">{{ event.time }}</span>
                  }
                </div>

                <!-- Spacer for Central Dot -->
                <div class="hidden md:block md:w-[10%]"></div>

                <!-- Right Side Content (All items on mobile; Odd details and Even time on desktop) -->
                <div class="w-full md:w-[42%] pl-16 md:pl-0">
                  <!-- Mobile view: Show Card for ALL items, Desktop view: Show Card only for Odd, and Time for Even -->
                  <div class="block md:hidden">
                    <div class="glass-luxury rounded-sm border border-gold-300/25 p-5 shadow-sm">
                      <span class="font-display text-xs text-gold-500 font-semibold tracking-widest block mb-1">{{ event.time }}</span>
                      <h3 class="font-serif text-lg font-bold text-stone-800 mb-2">{{ event.title }}</h3>
                      <p class="font-serif text-stone-600 text-sm leading-relaxed">{{ event.description }}</p>
                    </div>
                  </div>

                  <!-- Desktop view only -->
                  <div class="hidden md:block">
                    @if (!isEven) {
                      <!-- Details Card for Odd -->
                      <div class="glass-luxury rounded-sm border border-gold-300/25 p-6 hover:shadow-xl hover:border-gold-400/50 transition-all duration-300 transform hover:-translate-y-1 text-left">
                        <span class="font-display text-xs text-gold-500 font-semibold tracking-widest block mb-1">{{ event.time }}</span>
                        <h3 class="font-serif text-lg font-bold text-stone-800 mb-2">{{ event.title }}</h3>
                        <p class="font-serif text-stone-600 text-sm leading-relaxed">{{ event.description }}</p>
                      </div>
                    } @else {
                      <!-- Time for Even -->
                      <span class="font-display text-2xl font-semibold tracking-[0.1em] text-gold-600 font-serif italic">{{ event.time }}</span>
                    }
                  </div>
                </div>

              </div>
            }
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
export class TimelineComponent {
  timelineEvents: TimelineEvent[] = [
    {
      time: '04:00 PM',
      title: 'The Welcome Reception',
      description: 'Guests arrive at our beautiful Sbiba venue. Enjoy refreshing welcome cocktails, traditional jasmine tea, and live acoustic violin strings in the lush garden.',
      icon: 'local_bar'
    },
    {
      time: '05:00 PM',
      title: 'The Ceremony',
      description: 'Witness the joining of hearts under our elegant floral arbor. A beautiful modern exchange of vows surrounded by loved ones and prayers.',
      icon: 'favorite'
    },
    {
      time: '06:30 PM',
      title: 'Sunset Photography & Hors d’Oeuvres',
      description: 'As the sun dips behind the beautiful Sbiba horizon, join us for a glass of champagne, artisanal hors d’oeuvres, and photos with the newlyweds.',
      icon: 'camera_alt'
    },
    {
      time: '08:00 PM',
      title: 'The Grand Banquet',
      description: 'A lavish gourmet dinner celebrating both rich Tunisian flavors and international culinary arts. Features live orchestral melodies.',
      icon: 'restaurant'
    },
    {
      time: '10:00 PM',
      title: 'The Cake & First Dance',
      description: 'Hamdi & Elaa take the floor for their romantic first dance. The cake cutting is followed by live DJ sets and celebratory dancing long into the starry night.',
      icon: 'music_note'
    }
  ];
}
