import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({ selector: 'app-checkout', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);
  private readonly router = inject(Router);
  readonly notes = signal('');
  readonly error = signal('');
  readonly placed = signal(false);

  placeOrder(): void {
    if (!this.cart.items().length) return;
    this.error.set('');
    const items = this.cart.items().map((item) => ({ menuItemId: String(item.menuItem._id || item.menuItem.id), quantity: item.quantity }));
    this.orders.createOrder(items, this.notes()).subscribe({ next: () => { this.cart.clear(); this.placed.set(true); }, error: (error: Error) => this.error.set(error.message) });
  }

  continueShopping(): void { this.router.navigate(['/menu']); }
}
