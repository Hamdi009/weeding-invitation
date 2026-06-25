import { ChangeDetectionStrategy, Component, signal, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EnvelopeComponent } from './components/envelope';
import { InvitationCardComponent } from './components/invitation-card';
import { CountdownComponent } from './components/countdown';
import { TimelineComponent } from './components/timeline';
import { GalleryComponent } from './components/gallery';
import { LocationComponent } from './components/location';
import { RSVPComponent } from './components/rsvp';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    CommonModule, 
    MatIconModule,
    EnvelopeComponent, 
    InvitationCardComponent, 
    CountdownComponent, 
    TimelineComponent, 
    GalleryComponent, 
    LocationComponent, 
    RSVPComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private platformId = inject(PLATFORM_ID);
  
  // App states
  isEnvelopeOpened = signal(false);
  
  // For automatic smooth scrolling to sections
  @ViewChild('rsvpSection') rsvpSection!: ElementRef;

  onEnvelopeOpened() {
    this.isEnvelopeOpened.set(true);
  }

  scrollToRSVP() {
    if (this.rsvpSection) {
      this.rsvpSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
