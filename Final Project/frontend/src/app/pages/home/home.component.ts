import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ReservationService } from '../../core/services/reservation.service';

@Component({ selector: 'app-home', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './home.component.html' })
export class HomeComponent {
  private readonly auth = inject(AuthService);
  private readonly reservations = inject(ReservationService);
  private readonly router = inject(Router);
  readonly guestCount = signal(2);
  readonly bookingName = signal('');
  readonly bookingNote = signal('');
  readonly bookingDate = signal('');
  readonly booked = signal(false);
  readonly bookingError = signal('');

  updateGuestCount(value: number): void { this.guestCount.set(Math.max(1, Math.min(12, value))); }
  bookTable(): void {
    this.bookingError.set('');
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/sign-in']); return; }
    if (!this.bookingName().trim() || !this.bookingDate()) return;
    this.reservations.create({ name: this.bookingName(), date: this.bookingDate(), guests: this.guestCount(), notes: this.bookingNote() }).subscribe({
      next: () => this.booked.set(true),
      error: () => this.bookingError.set('We could not save that request. Please try again.'),
    });
  }
}
