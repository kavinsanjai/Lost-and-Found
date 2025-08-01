import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient) { }

  // Login with mock API
  login(username: string, password: string): Observable<any> {
    // Simulate API call with delay
    return of(null).pipe(delay(1000)).pipe(() => {
      // Mock validation - you can change these credentials
      if (username === 'admin' && password === 'admin123') {
        return of({
          success: true,
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Login successful'
        });
      } else if (username === 'user' && password === 'password') {
        return of({
          success: true,
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Login successful'
        });
      } else {
        return throwError(() => new Error('Invalid credentials'));
      }
    });
  }

  // Register with mock API
  register(username: string, password: string): Observable<any> {
    // Simulate API call with delay
    return of(null).pipe(delay(1000)).pipe(() => {
      // Mock registration - always succeeds for demo
      return of({
        success: true,
        id: Math.floor(Math.random() * 1000) + 1,
        token: 'mock-jwt-token-' + Date.now(),
        message: 'Registration successful'
      });
    });
  }

  // Simple login validation (fallback for demo)
  validateLogin(username: string, password: string): boolean {
    return username === 'admin' && password === 'admin123';
  }
}
