import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  constructor(protected readonly auth: AuthService, protected readonly cart: CartService, private readonly router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
