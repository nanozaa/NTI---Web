import { Component, inject, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Order } from '../../core/models/models';
import { OrderService } from '../../core/services/order.service';

@Component({ selector: 'app-account-orders', standalone: true, imports: [DatePipe, TitleCasePipe], templateUrl: './account-orders.component.html' })
export class AccountOrdersComponent {
  readonly orders = signal<Order[]>([]);
  readonly loading = signal(true);
  constructor() { inject(OrderService).getMyOrders().subscribe({ next: (orders) => this.orders.set(orders), error: () => this.orders.set([]), complete: () => this.loading.set(false) }); }
}
