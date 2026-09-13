import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({ selector: 'app-sign-up', standalone: true, imports: [ReactiveFormsModule, RouterLink], templateUrl: './sign-up.component.html' })
export class SignUpComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({ firstName: ['', [Validators.required, Validators.minLength(2)]], lastName: ['', [Validators.required, Validators.minLength(2)]], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(8)]], phone: [''] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const data = new FormData(); Object.entries(this.form.getRawValue()).forEach(([key, value]) => data.append(key, value)); this.auth.signUp(data).subscribe({ next: () => this.router.navigateByUrl('/menu'), error: (error: Error) => this.error.set(error.message) }); }
}
