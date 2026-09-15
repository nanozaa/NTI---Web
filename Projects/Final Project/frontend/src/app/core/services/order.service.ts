import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly http: HttpClient) {}
  createOrder(items: { menuItemId: string; quantity: number }[], notes: string) { return this.http.post<{ data: { order: Order } }>('/api/v1/orders', { items, notes }).pipe(map((response) => response.data.order)); }
  getMyOrders() { return this.http.get<{ data: { orders: Order[] } }>('/api/v1/orders/mine').pipe(map((response) => response.data.orders)); }
  getAllOrders() { return this.http.get<{ data: { orders: Order[] } }>('/api/v1/orders').pipe(map((response) => response.data.orders)); }
  updateStatus(id: string, status: Order['status']) { return this.http.patch<{ data: { order: Order } }>(`/api/v1/orders/${id}/status`, { status }).pipe(map((response) => response.data.order)); }
}