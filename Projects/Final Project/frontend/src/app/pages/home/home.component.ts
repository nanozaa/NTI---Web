import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-home', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './home.component.html' })
export class HomeComponent {
  readonly guestCount = signal(2);
  readonly bookingName = signal('');
  readonly bookingNote = signal('');
  readonly booked = signal(false);

  updateGuestCount(value: number): void { this.guestCount.set(Math.max(1, Math.min(12, value))); }
  bookTable(): void { if (this.bookingName().trim()) this.booked.set(true); }
}
