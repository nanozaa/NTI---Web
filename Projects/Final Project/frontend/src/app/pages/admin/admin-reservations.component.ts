import { Component, inject, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../../core/models/models';
import { ReservationService } from '../../core/services/reservation.service';

@Component({ selector: 'app-admin-reservations', standalone: true, imports: [FormsModule, DatePipe, TitleCasePipe], templateUrl: './admin-reservations.component.html' })
export class AdminReservationsComponent {
  private readonly service = inject(ReservationService);
  readonly reservations = signal<Reservation[]>([]);
  readonly statuses: Reservation['status'][] = ['pending', 'confirmed', 'seated', 'completed', 'cancelled'];
  constructor() { this.refresh(); }
  refresh(): void { this.service.getAll().subscribe({ next: (reservations) => this.reservations.set(reservations) }); }
  update(reservation: Reservation): void { this.service.updateStatus(reservation._id, reservation.status).subscribe({ next: (updated) => this.reservations.update((items) => items.map((item) => item._id === updated._id ? updated : item)) }); }
}