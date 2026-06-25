import { ChangeDetectionStrategy, Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface PublicWish {
  name: string;
  message: string;
  attendance: 'attending' | 'declined';
  createdAt: string;
}

@Component({
  selector: 'app-rsvp',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full py-24 px-4 bg-gradient-to-b from-warm-cream to-beige select-none">
      <!-- Background floral accents -->
      <div class="absolute left-4 top-1/4 text-gold-200/10 text-9xl pointer-events-none font-serif">❦</div>
      <div class="absolute right-4 bottom-1/4 text-gold-200/10 text-9xl pointer-events-none font-serif">✦</div>

      <div class="max-w-4xl mx-auto space-y-16">
        
        <!-- Header -->
        <div class="text-center space-y-3">
          <span class="font-display text-xs tracking-[0.3em] text-gold-600 uppercase block">Share in Our Joy</span>
          <h2 class="font-serif italic text-4xl text-stone-800 tracking-wide">Kindly Respond</h2>
          <div class="w-16 h-[1.5px] bg-gold-400/35 mx-auto mt-4"></div>
          <p class="font-serif italic text-stone-500 text-sm max-w-md mx-auto pt-2">Please reply by May 31, 2027 so we can prepare our perfect celebration.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- RSVP Form Card (8 Columns on desktop) -->
          <div class="lg:col-span-7 glass-luxury p-8 md:p-10 rounded-sm border border-gold-300/30 shadow-2xl relative overflow-hidden">
            
            @if (!isSubmitted()) {
              <form [formGroup]="rsvpForm" (ngSubmit)="onSubmit()" class="space-y-6">
                
                <!-- Guest Name -->
                <div class="flex flex-col space-y-1.5">
                  <label class="font-display text-[10px] tracking-[0.15em] text-stone-500 uppercase font-bold" for="name">Your Full Name *</label>
                  <div class="relative">
                    <mat-icon class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70 text-lg">person</mat-icon>
                    <input 
                      id="name"
                      type="text" 
                      formControlName="name"
                      placeholder="e.g. Salim Ben Ali"
                      class="w-full pl-11 pr-4 py-3 bg-white/75 border border-stone-200 rounded-sm focus:border-gold-500 focus:outline-none font-serif text-sm text-stone-800 placeholder-stone-400 transition-colors"
                      [class.border-red-400]="isFieldInvalid('name')"
                    />
                  </div>
                  @if (isFieldInvalid('name')) {
                    <span class="text-[11px] text-red-500 font-serif">Please provide your name.</span>
                  }
                </div>

                <!-- Email Address -->
                <div class="flex flex-col space-y-1.5">
                  <label class="font-display text-[10px] tracking-[0.15em] text-stone-500 uppercase font-bold" for="email">Email Address</label>
                  <div class="relative">
                    <mat-icon class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70 text-lg">mail_outline</mat-icon>
                    <input 
                      id="email"
                      type="email" 
                      formControlName="email"
                      placeholder="e.g. salim@example.com"
                      class="w-full pl-11 pr-4 py-3 bg-white/75 border border-stone-200 rounded-sm focus:border-gold-500 focus:outline-none font-serif text-sm text-stone-800 placeholder-stone-400 transition-colors"
                      [class.border-red-400]="isFieldInvalid('email')"
                    />
                  </div>
                  @if (isFieldInvalid('email')) {
                    <span class="text-[11px] text-red-500 font-serif">Please provide a valid email.</span>
                  }
                </div>

                <!-- Attendance Choice -->
                <div class="flex flex-col space-y-2">
                  <span class="font-display text-[10px] tracking-[0.15em] text-stone-500 uppercase font-bold">Will you attend? *</span>
                  <div class="grid grid-cols-2 gap-4">
                    <!-- Attending Option -->
                    <label 
                      class="flex items-center justify-center gap-2 py-3 px-4 border rounded-sm cursor-pointer transition-all duration-300 text-sm font-serif select-none"
                      [class.border-gold-500]="rsvpForm.get('attendance')?.value === 'attending'"
                      [class.bg-gold-50]="rsvpForm.get('attendance')?.value === 'attending'"
                      [class.text-gold-700]="rsvpForm.get('attendance')?.value === 'attending'"
                      [class.font-bold]="rsvpForm.get('attendance')?.value === 'attending'"
                      [class.border-stone-200]="rsvpForm.get('attendance')?.value !== 'attending'"
                      [class.bg-white/50]="rsvpForm.get('attendance')?.value !== 'attending'"
                    >
                      <input 
                        type="radio" 
                        formControlName="attendance" 
                        value="attending" 
                        class="hidden"
                      />
                      <mat-icon class="text-base">check_circle</mat-icon>
                      Joyfully Attend
                    </label>

                    <!-- Declined Option -->
                    <label 
                      class="flex items-center justify-center gap-2 py-3 px-4 border rounded-sm cursor-pointer transition-all duration-300 text-sm font-serif select-none"
                      [class.border-gold-500]="rsvpForm.get('attendance')?.value === 'declined'"
                      [class.bg-gold-50]="rsvpForm.get('attendance')?.value === 'declined'"
                      [class.text-gold-700]="rsvpForm.get('attendance')?.value === 'declined'"
                      [class.font-bold]="rsvpForm.get('attendance')?.value === 'declined'"
                      [class.border-stone-200]="rsvpForm.get('attendance')?.value !== 'declined'"
                      [class.bg-white/50]="rsvpForm.get('attendance')?.value !== 'declined'"
                    >
                      <input 
                        type="radio" 
                        formControlName="attendance" 
                        value="declined" 
                        class="hidden"
                      />
                      <mat-icon class="text-base">close</mat-icon>
                      Regretfully Decline
                    </label>
                  </div>
                </div>

                <!-- Number of Guests (Only visible if attending) -->
                @if (rsvpForm.get('attendance')?.value === 'attending') {
                  <div class="flex flex-col space-y-1.5 animate-fade-in">
                    <label class="font-display text-[10px] tracking-[0.15em] text-stone-500 uppercase font-bold" for="guests">Number of Guests</label>
                    <select 
                      id="guests"
                      formControlName="guests"
                      class="w-full px-4 py-3 bg-white/75 border border-stone-200 rounded-sm focus:border-gold-500 focus:outline-none font-serif text-sm text-stone-800 transition-colors"
                    >
                      <option [value]="1">Just Me (1)</option>
                      <option [value]="2">Two Guests (2)</option>
                      <option [value]="3">Three Guests (3)</option>
                      <option [value]="4">Four Guests (4)</option>
                    </select>
                  </div>

                  <!-- Dietary Restrictions -->
                  <div class="flex flex-col space-y-1.5 animate-fade-in">
                    <label class="font-display text-[10px] tracking-[0.15em] text-stone-500 uppercase font-bold" for="dietary">Dietary Requirements</label>
                    <input 
                      id="dietary"
                      type="text" 
                      formControlName="dietary"
                      placeholder="e.g. Vegetarian, Gluten-Free, Allergies"
                      class="w-full px-4 py-3 bg-white/75 border border-stone-200 rounded-sm focus:border-gold-500 focus:outline-none font-serif text-sm text-stone-800 placeholder-stone-400 transition-colors"
                    />
                  </div>
                }

                <!-- Well Wishes Msg -->
                <div class="flex flex-col space-y-1.5">
                  <label class="font-display text-[10px] tracking-[0.15em] text-stone-500 uppercase font-bold" for="message">Wishes or Message for the Couple</label>
                  <textarea 
                    id="message"
                    formControlName="message"
                    rows="3"
                    placeholder="Send your blessings, love or warm greetings..."
                    class="w-full px-4 py-3 bg-white/75 border border-stone-200 rounded-sm focus:border-gold-500 focus:outline-none font-serif text-sm text-stone-800 placeholder-stone-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit"
                  [disabled]="isSubmitting()"
                  class="w-full relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-gold-100 font-display text-xs font-semibold tracking-[0.2em] uppercase border border-gold-400/30 rounded-sm hover:bg-gold-500 hover:text-luxury-black disabled:opacity-50 transition-all duration-300 select-none cursor-pointer group"
                >
                  <mat-icon class="text-sm">send</mat-icon>
                  <span>{{ isSubmitting() ? 'Sending Blessings...' : 'Submit RSVP' }}</span>
                </button>

              </form>
            } @else {
              <!-- Success Screen -->
              <div class="text-center py-12 px-4 space-y-6 animate-fade-in flex flex-col items-center">
                <!-- Golden Confetti Circle -->
                <div class="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-400 flex items-center justify-center text-gold-500 animate-bounce">
                  <mat-icon class="text-3xl">favorite</mat-icon>
                </div>

                <div class="space-y-2">
                  <h3 class="font-serif italic text-2xl text-stone-800">Blessings Received</h3>
                  <p class="font-serif text-sm text-stone-600 max-w-sm leading-relaxed">
                    Thank you, <strong class="text-stone-800">{{ rsvpForm.get('name')?.value }}</strong>. Your RSVP has been preserved beautifully. 
                    @if (rsvpForm.get('attendance')?.value === 'attending') {
                      We cannot wait to celebrate our union with you on June 25, 2027 in Sbiba!
                    } @else {
                      We will miss you dearly, but we carry your warm blessings in our hearts.
                    }
                  </p>
                </div>

                <div class="w-16 h-[1px] bg-gold-300/30"></div>

                <button 
                  (click)="resetForm()"
                  class="font-display text-[10px] tracking-[0.25em] text-gold-600 hover:text-gold-800 uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <mat-icon class="text-sm">person</mat-icon>
                  Submit Another Response
                </button>
              </div>
            }

          </div>

          <!-- Public Guest Book / Wishes Rail (5 Columns on desktop) -->
          <div class="lg:col-span-5 flex flex-col space-y-6">
            <div class="glass-luxury p-6 rounded-sm border border-gold-300/20 shadow-xl flex-1 flex flex-col max-h-[500px]">
              
              <div class="flex items-center gap-2 pb-4 border-b border-gold-300/15 mb-4">
                <mat-icon class="text-gold-500">favorite_border</mat-icon>
                <h3 class="font-display text-xs tracking-[0.2em] text-stone-800 uppercase font-bold">Guest Book Blessings</h3>
              </div>

              <!-- List of public wishes -->
              <div class="space-y-4 overflow-y-auto flex-1 pr-1 scrollbar-thin">
                @if (publicWishes().length === 0) {
                  <div class="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                    <span class="text-3xl mb-1">❦</span>
                    <p class="font-serif italic text-xs">Be the first to leave a warm blessing for Hamdi & Elaa!</p>
                  </div>
                } @else {
                  @for (wish of publicWishes(); track wish.createdAt) {
                    <div class="p-4 bg-white/60 border border-stone-200/50 rounded-sm space-y-2 relative">
                      <div class="flex items-center justify-between">
                        <span class="font-serif text-sm font-bold text-stone-800">{{ wish.name }}</span>
                        <span 
                          class="font-display text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                          [class.bg-emerald-50]="wish.attendance === 'attending'"
                          [class.text-emerald-700]="wish.attendance === 'attending'"
                          [class.bg-stone-50]="wish.attendance !== 'attending'"
                          [class.text-stone-500]="wish.attendance !== 'attending'"
                        >
                          {{ wish.attendance === 'attending' ? 'Attending' : 'With Regrets' }}
                        </span>
                      </div>
                      <p class="font-serif italic text-xs text-stone-600 leading-relaxed">
                        "{{ wish.message }}"
                      </p>
                      <span class="font-display text-[8px] text-stone-400 block text-right">{{ wish.createdAt | date:'mediumDate' }}</span>
                    </div>
                  }
                }
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
  `]
})
export class RSVPComponent implements OnInit {
  private fb = inject(FormBuilder);
  rsvpForm: FormGroup;
  isSubmitting = signal(false);
  isSubmitted = signal(false);
  publicWishes = signal<PublicWish[]>([]);

  constructor() {
    this.rsvpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      attendance: ['attending', Validators.required],
      guests: [1],
      dietary: [''],
      message: ['']
    });
  }

  ngOnInit() {
    this.fetchPublicWishes();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.rsvpForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  async fetchPublicWishes() {
    try {
      const response = await fetch('/api/rsvps');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Sort by date descending
          const wishes = (result.data as PublicWish[]).sort((a: PublicWish, b: PublicWish) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          this.publicWishes.set(wishes);
        }
      }
    } catch (e) {
      console.error('Failed to load guestbook blessings:', e);
    }
  }

  async onSubmit() {
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.rsvpForm.value;

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValue)
      });

      if (response.ok) {
        this.isSubmitted.set(true);
        // Reload wishes so the new one appears instantly
        this.fetchPublicWishes();
      } else {
        alert('Could not submit RSVP. Please try again.');
      }
    } catch (e) {
      console.error('RSVP submission error:', e);
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm() {
    this.rsvpForm.reset({
      name: '',
      email: '',
      attendance: 'attending',
      guests: 1,
      dietary: '',
      message: ''
    });
    this.isSubmitted.set(false);
  }
}
