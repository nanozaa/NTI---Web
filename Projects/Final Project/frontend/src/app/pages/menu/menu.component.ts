import { Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../core/models/models';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';

@Component({ selector: 'app-menu', standalone: true, imports: [FormsModule, TitleCasePipe, RouterLink], templateUrl: './menu.component.html' })
export class MenuComponent {
  private readonly menuService = inject(MenuService);
  readonly cart = inject(CartService);
  readonly menu = signal<MenuItem[]>([]);
  readonly search = signal('');
  readonly loading = signal(true);
  readonly categories = ['all', 'starter', 'main course', 'dessert', 'beverage'];
  readonly category = signal('all');
  readonly filteredMenu = computed(() => this.menu().filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.search().toLowerCase());
    return matchesSearch && (this.category() === 'all' || item.category === this.category());
  }));

  constructor() { this.menuService.getMenu().subscribe((items) => { this.menu.set(items); this.loading.set(false); }); }
  setCategory(value: string): void { this.category.set(value); }
  addToOrder(item: MenuItem, event: Event): void { event.preventDefault(); event.stopPropagation(); this.cart.add(item); }
  replaceImage(event: Event): void { (event.target as HTMLImageElement).src = '/images/dish-fallback.svg'; }
}
