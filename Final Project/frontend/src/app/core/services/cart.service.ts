import { Injectable, computed, signal } from '@angular/core';
import { CartItem, MenuItem } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storedItems = this.readCart();
  readonly items = signal<CartItem[]>(this.storedItems);
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() => this.items().reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0));

  add(item: MenuItem): void {
    const existing = this.items().find((entry) => String(entry.menuItem._id || entry.menuItem.id) === String(item._id || item.id));
    const next = existing ? this.items().map((entry) => entry === existing ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...this.items(), { menuItem: item, quantity: 1 }];
    this.save(next);
  }

  remove(item: CartItem): void { this.save(this.items().filter((entry) => entry !== item)); }
  changeQuantity(item: CartItem, quantity: number): void { if (quantity < 1) return this.remove(item); this.save(this.items().map((entry) => entry === item ? { ...entry, quantity } : entry)); }
  clear(): void { this.save([]); }

  private save(items: CartItem[]): void { this.items.set(items); localStorage.setItem('saffron_cart', JSON.stringify(items)); }
  private readCart(): CartItem[] { const saved = localStorage.getItem('saffron_cart'); return saved ? JSON.parse(saved) as CartItem[] : []; }
}