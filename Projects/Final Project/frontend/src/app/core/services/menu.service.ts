import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, timeout } from 'rxjs';
import { MenuItem } from '../models/models';

const fallbackMenu: MenuItem[] = [
  { id: 1, name: 'Classic Beef Burger', category: 'main course', description: 'Charred beef, aged cheddar, and house pickles.', price: 12.99, available: true, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Margherita Pizza', category: 'main course', description: 'San Marzano tomato, basil, and Fior di Latte.', price: 10.5, available: true, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Chocolate Brownie', category: 'dessert', description: 'Warm dark chocolate brownie with sea salt.', price: 5.75, available: true, imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Citrus Garden Salad', category: 'starter', description: 'Baby greens, orange, herbs, and toasted pistachio.', price: 8.25, available: true, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Truffle Pasta', category: 'main course', description: 'Silky tagliatelle, wild mushrooms, and parmesan.', price: 15.75, available: true, imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Mint Lemonade', category: 'beverage', description: 'Fresh lemon, garden mint, and a little sparkle.', price: 4.5, available: true, imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Crispy Calamari', category: 'starter', description: 'Lightly fried calamari, lemon aioli, and herbs.', price: 9.5, available: true, imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Roasted Salmon', category: 'main course', description: 'Herb roasted salmon with greens and lemon butter.', price: 18.25, available: true, imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Tiramisu Cloud', category: 'dessert', description: 'Espresso soaked mascarpone, cocoa, and soft sponge.', price: 7.25, available: true, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Iced Pistachio Latte', category: 'beverage', description: 'Cold espresso, pistachio cream, and silky milk.', price: 6.25, available: true, imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85' },
];

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private readonly http: HttpClient) {}

  getMenu() {
    return this.http.get<{ data: { menu: MenuItem[] } }>('/api/v1/menu').pipe(timeout({ first: 1500 }), map((response) => response.data.menu), catchError(() => of(fallbackMenu)));
  }

  getMenuItem(id: string) {
    return this.http.get<{ data: { menuItem: MenuItem } }>(`/api/v1/menu/${id}`).pipe(
      timeout({ first: 1500 }),
      map((response) => response.data.menuItem),
      catchError(() => of(fallbackMenu.find((item) => String(item.id) === id) as MenuItem)),
    );
  }

  saveMenuItem(item: Partial<MenuItem>) {
    return this.http.post<{ data: { menuItem: MenuItem } }>('/api/v1/menu', item).pipe(map((response) => response.data.menuItem));
  }

  getMyMenu() {
    return this.http.get<{ data: { myMenuItems: MenuItem[] } }>('/api/v1/users/menu').pipe(map((response) => response.data.myMenuItems));
  }

  addToMyMenu(menuItemId: string) {
    return this.http.post('/api/v1/users/menu', { menuItemId });
  }
}
