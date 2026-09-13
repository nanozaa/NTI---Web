import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../core/services/menu.service';
import { AdminOrdersComponent } from './admin-orders.component';

@Component({ selector: 'app-admin', standalone: true, imports: [FormsModule, AdminOrdersComponent], templateUrl: './admin.component.html' })
export class AdminComponent {
  private readonly menuService = inject(MenuService);
  readonly saved = signal(false);
  readonly item = { name: '', category: 'starter', price: 0, description: '', imageUrl: '', available: true };
  save(): void { this.menuService.saveMenuItem(this.item).subscribe({ next: () => this.saved.set(true) }); }
}
