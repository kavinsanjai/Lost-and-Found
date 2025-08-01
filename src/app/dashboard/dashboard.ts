import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet,RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard{
  showSidebar = true;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    // Clear any stored authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    
    // Navigate back to login page
    this.router.navigate(['/login']);
  }
}
