import { Component, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../core/models/models';
import { MenuService } from '../../core/services/menu.service';
import { AdminOrdersComponent } from './admin-orders.component';
import { AdminReservationsComponent } from './admin-reservations.component';

@Component({ selector: 'app-admin', standalone: true, imports: [FormsModule, TitleCasePipe, AdminOrdersComponent, AdminReservationsComponent], templateUrl: './admin.component.html' })
export class AdminComponent {
  private readonly menuService = inject(MenuService);
  readonly saved = signal(false);
  readonly menu = signal<MenuItem[]>([]);
  readonly item = { name: '', category: 'starter', price: 0, description: '', imageUrl: '', available: true };
  editingId: string | null = null;
  constructor() { this.refresh(); }
  refresh(): void { this.menuService.getMenu().subscribe((items) => this.menu.set(items)); }
  save(): void {
    const request = this.editingId ? this.menuService.updateMenuItem(this.editingId, this.item) : this.menuService.saveMenuItem(this.item);
    request.subscribe({ next: (item) => { this.menu.update((items) => this.editingId ? items.map((current) => current._id === item._id ? item : current) : [...items, item]); this.reset(); this.saved.set(true); } });
  }
  edit(item: MenuItem): void { this.editingId = item._id || null; Object.assign(this.item, item); this.saved.set(false); }
  remove(item: MenuItem): void { if (!item._id) return; this.menuService.deleteMenuItem(item._id).subscribe(() => this.menu.update((items) => items.filter((current) => current._id !== item._id))); }
  toggle(item: MenuItem): void { if (!item._id) return; this.menuService.updateMenuItem(item._id, { available: !item.available }).subscribe((updated) => this.menu.update((items) => items.map((current) => current._id === updated._id ? updated : current))); }
  reset(): void { this.editingId = null; Object.assign(this.item, { name: '', category: 'starter', price: 0, description: '', imageUrl: '', available: true }); }
}
