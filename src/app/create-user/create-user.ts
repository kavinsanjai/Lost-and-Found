import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Create User with External API</h2>
      
      <div class="row">
        <div class="col-md-6">
          <form (ngSubmit)="createUser()" #userForm="ngForm">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="name" 
                name="name"
                [(ngModel)]="userData.name" 
                required>
            </div>
            
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                name="email"
                [(ngModel)]="userData.email" 
                required>
            </div>
            
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input 
                type="text" 
                class="form-control" 
                id="phone" 
                name="phone"
                [(ngModel)]="userData.phone">
            </div>
            
            <div class="mb-3">
              <label for="website" class="form-label">Website</label>
              <input 
                type="url" 
                class="form-control" 
                id="website" 
                name="website"
                [(ngModel)]="userData.website">
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary" 
              [disabled]="loading || !userForm.form.valid">
              {{ loading ? 'Creating...' : 'Create User' }}
            </button>
          </form>
        </div>
        
        <div class="col-md-6">
          <div *ngIf="message" class="alert" [ngClass]="{'alert-success': success, 'alert-danger': !success}">
            {{ message }}
          </div>
          
          <div *ngIf="createdUser" class="card">
            <div class="card-header">
              <h5>Created User</h5>
            </div>
            <div class="card-body">
              <p><strong>ID:</strong> {{ createdUser.id }}</p>
              <p><strong>Name:</strong> {{ createdUser.name }}</p>
              <p><strong>Email:</strong> {{ createdUser.email }}</p>
              <p><strong>Phone:</strong> {{ createdUser.phone }}</p>
              <p><strong>Website:</strong> {{ createdUser.website }}</p>
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
  `]
})
export class CreateUserComponent {
  userData = {
    name: '',
    email: '',
    phone: '',
    website: ''
  };
  
  loading = false;
  message = '';
  success = false;
  createdUser: any = null;

  constructor(private apiService: ApiService) {}

  createUser() {
    this.loading = true;
    this.message = '';
    this.success = false;
    this.createdUser = null;

    this.apiService.createUser(this.userData).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = true;
        this.message = 'User created successfully!';
        this.createdUser = response;
        
        // Reset form
        this.userData = {
          name: '',
          email: '',
          phone: '',
          website: ''
        };
      },
      error: (error) => {
        this.loading = false;
        this.success = false;
        this.message = 'Error creating user: ' + error.message;
        console.error('Create user error:', error);
      }
    });
  }
} 