import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-sign-in', standalone: true, imports: [FormsModule, RouterLink], templateUrl: './sign-in.component.html' })
export class SignInComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly error = signal('');
  readonly form = { email: '', password: '' };
  submit(): void { this.error.set(''); this.auth.signIn(this.form).subscribe({ next: () => this.router.navigateByUrl(this.auth.isAdmin() ? '/admin' : '/menu'), error: (error: Error) => this.error.set(error.message) }); }
}
