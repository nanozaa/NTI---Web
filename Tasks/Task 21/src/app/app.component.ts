import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly products: Product[] = [
    {
      id: 1,
      name: 'Sienna Mug',
      price: 24,
      category: 'Ceramics',
      description: 'Hand-thrown stoneware for slow mornings.',
      accent: 'terracotta'
    },
    {
      id: 2,
      name: 'Folded Tote',
      price: 38,
      category: 'Textiles',
      description: 'A generous everyday carry in washed canvas.',
      accent: 'sage'
    },
    {
      id: 3,
      name: 'Field Notes',
      price: 16,
      category: 'Stationery',
      description: 'Recycled paper, ready for bright ideas.',
      accent: 'ochre'
    },
    {
      id: 4,
      name: 'Linen Throw',
      price: 72,
      category: 'Home',
      description: 'A soft, breathable layer for quiet corners.',
      accent: 'ink'
    }
  ];

  cart = signal<Product[]>([]);
  totalPrice = computed(() => this.cart().reduce((sum, product) => sum + product.price, 0));
  cartCount = computed(() => this.cart().length);

  constructor() {
    effect(() => {
      console.log(`Cart items count: ${this.cartCount()}`);
    });
  }

  addToCart(product: Product): void {
    this.cart.update((items) => items.some((item) => item.id === product.id) ? items : [...items, product]);
  }

  removeFromCart(productId: number): void {
    this.cart.update((items) => items.filter((item) => item.id !== productId));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  isInCart(productId: number): boolean {
    return this.cart().some((item) => item.id === productId);
  }
}
