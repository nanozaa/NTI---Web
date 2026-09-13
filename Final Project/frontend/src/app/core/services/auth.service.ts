import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthResponse, User } from '../models/models';

const TOKEN_KEY = 'saffron_token';
const USER_KEY = 'saffron_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<User | null>(this.readUser());
  readonly isLoggedIn = signal(Boolean(localStorage.getItem(TOKEN_KEY)));

  constructor(private readonly http: HttpClient) {}

  signIn(credentials: { email: string; password: string }) {
    return this.http.post<AuthResponse>('/api/v1/auth/signin', credentials).pipe(tap((response) => this.setSession(response)));
  }

  signUp(payload: FormData) {
    return this.http.post<AuthResponse>('/api/v1/auth/signup', payload).pipe(tap((response) => this.setSession(response)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }

  token(): string | null { return localStorage.getItem(TOKEN_KEY); }
  isAdmin(): boolean { return this.currentUser()?.role === 'admin'; }

  private setSession(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
    this.currentUser.set(response.data.user);
    this.isLoggedIn.set(true);
  }

  private readUser(): User | null {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) as User : null;
  }
}
