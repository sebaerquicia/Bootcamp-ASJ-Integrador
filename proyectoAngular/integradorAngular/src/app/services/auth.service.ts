import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedValue: boolean = false;
  private username: string = '';

  constructor(private router: Router) {
    const sessionData = localStorage.getItem('session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      this.isAuthenticatedValue = session.isAuthenticated;
      this.username = session.username;
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedValue = true;
      this.username = username;
      localStorage.setItem(
        'session',
        JSON.stringify({ isAuthenticated: true, username: username })
      );
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedValue = false;
    this.username = '';
    localStorage.removeItem('session');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  getUsername(): string {
    return this.username;
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedValue = value;
  }

  setUsername(value: string): void {
    this.username = value;
  }

  getIsAuthenticatedValue(): boolean {
    return this.isAuthenticatedValue;
  }
}
