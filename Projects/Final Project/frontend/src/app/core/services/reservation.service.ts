import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Reservation } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private readonly http: HttpClient) {}
  create(payload: { name: string; date: string; guests: number; notes: string }) { return this.http.post<{ data: { reservation: Reservation } }>('/api/v1/reservations', payload).pipe(map((response) => response.data.reservation)); }
  getAll() { return this.http.get<{ data: { reservations: Reservation[] } }>('/api/v1/reservations').pipe(map((response) => response.data.reservations)); }
  updateStatus(id: string, status: Reservation['status']) { return this.http.patch<{ data: { reservation: Reservation } }>(`/api/v1/reservations/${id}/status`, { status }).pipe(map((response) => response.data.reservation)); }
}