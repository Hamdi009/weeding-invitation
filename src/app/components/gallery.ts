import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full py-24 px-4 bg-gradient-to-b from-beige to-warm-cream">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center space-y-3 mb-16">
          <span class="font-display text-xs tracking-[0.3em] text-gold-600 uppercase block">Capturing the Romance</span>
          <h2 class="font-serif italic text-4xl text-stone-800 tracking-wide">Captured Moments</h2>
          <div class="w-16 h-[1.5px] bg-gold-400/35 mx-auto mt-4"></div>
          <p class="font-serif italic text-stone-500 text-sm max-w-md mx-auto pt-2">A glimpse into our love story, the details, and the places close to our hearts.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap">
          @for (cat of categories; track cat) {
            <button
              (click)="activeCategory.set(cat)"
              class="font-display text-xs tracking-[0.2em] uppercase py-2 px-4 transition-all duration-300 relative select-none cursor-pointer"
              [class.text-gold-600]="activeCategory() === cat"
              [class.font-bold]="activeCategory() === cat"
              [class.text-stone-400]="activeCategory() !== cat"
            >
              {{ cat }}
              @if (activeCategory() === cat) {
                <span class="absolute bottom-0 left-4 right-4 h-[1px] bg-gold-500 transition-all"></span>
              }
            </button>
          }
        </div>

        <!-- Image Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          @for (img of filteredImages(); track img.src; let i = $index) {
            <div 
              (click)="openLightbox(img, i)"
              (keydown.enter)="openLightbox(img, i)"
              tabindex="0"
              class="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold-300/10 shadow-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            >
              <!-- Luxury overlay frame -->
              <div class="absolute inset-0 border border-gold-400/0 group-hover:border-gold-400/30 z-10 transition-all duration-500 m-3 pointer-events-none"></div>

              <!-- Unsplash Image -->
              <img 
                [src]="img.src" 
                [alt]="img.alt" 
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-100 group-hover:scale-105 filter brightness-95 group-hover:brightness-90"
              />

              <!-- Caption Overlay (fades in on hover) -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                <span class="font-display text-[9px] tracking-[0.25em] text-gold-300 uppercase mb-1">{{ img.category }}</span>
                <h3 class="font-serif text-base text-gold-50 font-medium leading-tight mb-2">{{ img.caption }}</h3>
                <div class="flex items-center gap-1.5 text-gold-400/90 text-xs">
                  <mat-icon class="text-sm">zoom_in</mat-icon>
                  <span class="font-display text-[9px] tracking-widest uppercase">View Larger</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Full Screen Lightbox Modal -->
      @if (lightboxActive()) {
        <div 
          class="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 select-none animate-fade-in focus:outline-none"
          (click)="closeLightbox()"
          (keydown.escape)="closeLightbox()"
          tabindex="0"
        >
          <!-- Close button -->
          <button 
            (click)="closeLightbox(); $event.stopPropagation()"
            class="absolute top-6 right-6 text-gold-100 hover:text-gold-400 transition-colors p-2 cursor-pointer bg-neutral-900/50 rounded-full border border-gold-400/20"
          >
            <mat-icon class="text-3xl">close</mat-icon>
          </button>

          <!-- Prev Button -->
          <button 
            (click)="prevImage(); $event.stopPropagation()"
            class="absolute left-4 md:left-8 text-gold-100 hover:text-gold-400 transition-colors p-3 cursor-pointer bg-neutral-900/50 rounded-full border border-gold-400/20"
          >
            <mat-icon class="text-3xl">chevron_left</mat-icon>
          </button>

          <!-- Main Image Container -->
          <div 
            class="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center"
            (click)="$event.stopPropagation()"
            (keydown.enter)="$event.stopPropagation()"
            tabindex="-1"
          >
            <img 
              [src]="currentLightboxImage()?.src" 
              [alt]="currentLightboxImage()?.alt"
              referrerpolicy="no-referrer"
              class="max-w-full max-h-[80vh] object-contain rounded-sm border border-gold-400/30 shadow-2xl"
            />
          </div>

          <!-- Caption -->
          <div 
            class="mt-6 text-center max-w-md space-y-1"
            (click)="$event.stopPropagation()"
            (keydown.enter)="$event.stopPropagation()"
            tabindex="-1"
          >
            <span class="font-display text-[9px] tracking-[0.25em] text-gold-400 uppercase block">
              {{ currentLightboxImage()?.category }}
            </span>
            <p class="font-serif text-lg text-gold-100 italic">
              "{{ currentLightboxImage()?.caption }}"
            </p>
            <p class="font-display text-[10px] text-stone-500 tracking-[0.15em] pt-1">
              Image {{ currentLightboxIndex() + 1 }} of {{ filteredImages().length }}
            </p>
          </div>

          <!-- Next Button -->
          <button 
            (click)="nextImage(); $event.stopPropagation()"
            class="absolute right-4 md:right-8 text-gold-100 hover:text-gold-400 transition-colors p-3 cursor-pointer bg-neutral-900/50 rounded-full border border-gold-400/20"
          >
            <mat-icon class="text-3xl">chevron_right</mat-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `]
})
export class GalleryComponent {
  categories = ['All', 'Ceremony', 'Love Story', 'Details'];
  activeCategory = signal('All');

  lightboxActive = signal(false);
  currentLightboxImage = signal<GalleryImage | null>(null);
  currentLightboxIndex = signal(0);

  // Real high-quality images of Hamdi & Elaa from their celebration
  images: GalleryImage[] = [
    {
      src: '/img1.jpg',
      alt: 'Welcome to the Engagement Ceremony of Hamdi & Elaa',
      caption: 'The Beautiful Beginning: Our Engagement Ceremony',
      category: 'Ceremony'
    },
    {
      src: '/img2.jpg',
      alt: 'Hamdi and Elaa dancing together in happiness',
      caption: 'Twirling in Love under Glowing Warm Light',
      category: 'Love Story'
    },
    {
      src: '/img3.jpg',
      alt: 'Hamdi and Elaa holding hands and smiling warmly',
      caption: 'Walking Hand-in-Hand towards Our Forever',
      category: 'Love Story'
    },
    {
      src: '/img4.jpg',
      alt: 'A stunning close-up of Elaa\'s elegant engagement ring',
      caption: 'A Glittering Promise of Eternal Affection',
      category: 'Details'
    }
  ];

  filteredImages() {
    const cat = this.activeCategory();
    if (cat === 'All') return this.images;
    return this.images.filter(img => img.category === cat);
  }

  openLightbox(img: GalleryImage, index: number) {
    this.currentLightboxImage.set(img);
    this.currentLightboxIndex.set(index);
    this.lightboxActive.set(true);
  }

  closeLightbox() {
    this.lightboxActive.set(false);
    this.currentLightboxImage.set(null);
  }

  prevImage() {
    const imagesList = this.filteredImages();
    let index = this.currentLightboxIndex() - 1;
    if (index < 0) {
      index = imagesList.length - 1;
    }
    this.currentLightboxIndex.set(index);
    this.currentLightboxImage.set(imagesList[index]);
  }

  nextImage() {
    const imagesList = this.filteredImages();
    let index = this.currentLightboxIndex() + 1;
    if (index >= imagesList.length) {
      index = 0;
    }
    this.currentLightboxIndex.set(index);
    this.currentLightboxImage.set(imagesList[index]);
  }
}
