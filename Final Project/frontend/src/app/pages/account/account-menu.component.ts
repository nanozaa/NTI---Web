import { Component, inject, signal } from '@angular/core';
import { MenuItem } from '../../core/models/models';
import { MenuService } from '../../core/services/menu.service';

@Component({ selector: 'app-account-menu', standalone: true, templateUrl: './account-menu.component.html' })
export class AccountMenuComponent {
  private readonly menuService = inject(MenuService);
  readonly items = signal<MenuItem[]>([]);
  readonly loading = signal(true);
  constructor() { this.menuService.getMyMenu().subscribe({ next: (items) => this.items.set(items), error: () => this.items.set([]), complete: () => this.loading.set(false) }); }
}
