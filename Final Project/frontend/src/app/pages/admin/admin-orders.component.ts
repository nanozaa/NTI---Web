import { Component, inject, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../core/models/models';
import { OrderService } from '../../core/services/order.service';

@Component({ selector: 'app-admin-orders', standalone: true, imports: [FormsModule, DatePipe, TitleCasePipe], templateUrl: './admin-orders.component.html' })
export class AdminOrdersComponent {
  private readonly service = inject(OrderService);
  readonly orders = signal<Order[]>([]);
  readonly statuses: Order['status'][] = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
  constructor() { this.refresh(); }
  refresh(): void { this.service.getAllOrders().subscribe({ next: (orders) => this.orders.set(orders) }); }
  update(order: Order): void { this.service.updateStatus(order._id, order.status).subscribe({ next: (updated) => this.orders.update((orders) => orders.map((item) => item._id === updated._id ? updated : item)) }); }
}
