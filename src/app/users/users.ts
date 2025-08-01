import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2>Users from External API</h2>
      
      <div class="row mb-3">
        <div class="col">
          <button class="btn btn-primary me-2" (click)="loadUsers()" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Load Users' }}
          </button>
          <button class="btn btn-success me-2" (click)="loadPosts()" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Load Posts' }}
          </button>
          <button class="btn btn-info me-2" (click)="loadRandomUser()" [disabled]="loading">
            {{ loading ? 'Loading...' : 'Random User' }}
          </button>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

      <!-- Users List -->
      <div *ngIf="users.length > 0" class="row">
        <div class="col-12">
          <h3>Users</h3>
          <div class="row">
            <div *ngFor="let user of users" class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ user.name }}</h5>
                  <p class="card-text">{{ user.email }}</p>
                  <p class="card-text"><small>{{ user.company?.name }}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts List -->
      <div *ngIf="posts.length > 0" class="row">
        <div class="col-12">
          <h3>Posts</h3>
          <div class="row">
            <div *ngFor="let post of posts.slice(0, 6)" class="col-md-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Random User -->
      <div *ngIf="randomUser" class="row">
        <div class="col-12">
          <h3>Random User</h3>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <img [src]="randomUser.picture?.large" class="img-fluid rounded" alt="User">
                </div>
                <div class="col-md-10">
                  <h5>{{ randomUser.name?.first }} {{ randomUser.name?.last }}</h5>
                  <p>{{ randomUser.email }}</p>
                  <p>{{ randomUser.location?.city }}, {{ randomUser.location?.country }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
  `]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  randomUser: any = null;
  loading = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    this.users = [];
    this.posts = [];
    this.randomUser = null;

    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading users: ' + error.message;
        this.loading = false;
      }
    });
  }

  loadPosts() {
    this.loading = true;
    this.error = '';
    this.users = [];
    this.posts = [];
    this.randomUser = null;

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading posts: ' + error.message;
        this.loading = false;
      }
    });
  }

  loadRandomUser() {
    this.loading = true;
    this.error = '';
    this.users = [];
    this.posts = [];
    this.randomUser = null;

    this.apiService.getRandomUser().subscribe({
      next: (data) => {
        this.randomUser = data.results[0];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading random user: ' + error.message;
        this.loading = false;
      }
    });
  }
} 