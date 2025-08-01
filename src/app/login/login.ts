import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(
    private router: Router, 
    private auth: Auth,
    private apiService: ApiService
  ) {}

  login() {
    if (this.username && this.password) {
      this.isLoading = true;
      this.errorMsg = '';
      
      // Use API service for login
      this.apiService.login({ username: this.username, password: this.password })
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            if (response.success) {
              // Store authentication state
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('user', JSON.stringify({ 
                username: this.username,
                token: response.token 
              }));
              
              alert("Logged in successfully!");
              this.router.navigate(['/dashboard/dashboard1']);
            } else {
              this.errorMsg = response.message || 'Invalid credentials.';
            }
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Login error:', error);
            this.errorMsg = 'Invalid credentials. Try: admin/admin123 or user/password';
          }
        });
    } else {
      this.errorMsg = 'Please enter both username and password.';
    }
  }
}
