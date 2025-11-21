import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Using external APIs
  private jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';
  private randomUserUrl = 'https://randomuser.me/api';

  constructor(private http: HttpClient) { }

  // GET request - Get users from external API
  getUsers(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/users`);
  }

  // GET request - Get user by ID
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/users/${id}`);
  }

  // POST request - Create user (simulated)
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.jsonPlaceholderUrl}/users`, userData);
  }

  // POST request - Mock login (since reqres.in requires API key now)
  login(credentials: {username: string, password: string}): Observable<any> {
    // Simulate API call with delay
    return new Observable(observer => {
      setTimeout(() => {
        // Mock validation - you can change these credentials
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          observer.next({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            message: 'Login successful'
          });
          observer.complete();
        } else if (credentials.username === 'user' && credentials.password === 'password') {
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

  // POST request - Mock registration
  register(userData: {username: string, password: string}): Observable<any> {
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

  // PUT request - Update user
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.jsonPlaceholderUrl}/users/${id}`, userData);
  }

  // DELETE request - Delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.jsonPlaceholderUrl}/users/${id}`);
  }

  // GET request - Get random user data
  getRandomUser(): Observable<any> {
    return this.http.get(`${this.randomUserUrl}/?results=1`);
  }

  // GET request - Get posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/posts`);
  }

  // GET request - Get comments
  getComments(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/comments`);
  }

  // GET request - Get albums
  getAlbums(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/albums`);
  }

  // GET request - Get photos
  getPhotos(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/photos`);
  }

  // GET request - Get todos
  getTodos(): Observable<any> {
    return this.http.get(`${this.jsonPlaceholderUrl}/todos`);
  }
} 