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
    return new Observable(observer => {
      setTimeout(() => {
        // Mock validation - you can change these credentials
        if (username === 'admin' && password === 'admin123') {
          observer.next({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            message: 'Login successful'
          });
          observer.complete();
        } else if (username === 'user' && password === 'password') {
          observer.next({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            message: 'Login successful'
          });
          observer.complete();
        } else {
          observer.error(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  // Register with mock API
  register(username: string, password: string): Observable<any> {
    // Simulate API call with delay
    return new Observable(observer => {
      setTimeout(() => {
        // Mock registration - always succeeds for demo
        observer.next({
          success: true,
          id: Math.floor(Math.random() * 1000) + 1,
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Registration successful'
        });
        observer.complete();
      }, 1000);
    });
  }

  // Simple login validation (fallback for demo)
  validateLogin(username: string, password: string): boolean {
    return username === 'admin' && password === 'admin123';
  }
}
