import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuItem } from '../../core/models/models';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      @if (loading()) { <p>Opening the dish card...</p> }
      @else if (item(); as dish) {
        <span class="eyebrow">{{ dish.category }}</span>
        <h1>{{ dish.name }}</h1>
        <p>{{ dish.description || 'A Saffron Table classic, prepared to order.' }}</p>
        <p class="price">&dollar;{{ dish.price.toFixed(2) }}</p>
        <button class="button" type="button" (click)="addToOrder(dish)">Add to order</button>
        <a class="button" routerLink="/menu">Back to menu</a>
      } @else { <h1>Dish not found.</h1><a class="button" routerLink="/menu">Back to menu</a> }
    </section>
  `,
})
export class MenuDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly menuService = inject(MenuService);
  private readonly cart = inject(CartService);
  readonly item = signal<MenuItem | null>(null);
  readonly loading = signal(true);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.loading.set(false); return; }
    this.menuService.getMenuItem(id).subscribe({ next: (item) => this.item.set(item), error: () => this.item.set(null), complete: () => this.loading.set(false) });
  }

  addToOrder(item: MenuItem): void { this.cart.add(item); }
}