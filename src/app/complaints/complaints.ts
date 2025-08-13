import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService, Complaint } from '../complaint.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaints.html',
  styleUrl: './complaints.css'
})
export class Complaints implements OnInit, OnDestroy {
  complaintService = inject(ComplaintService);
  http = inject(HttpClient);
  
  complaints: Complaint[] = [];
  users: any[] = [];
  loading = false;
  error = '';
  private refreshInterval: any;

  ngOnInit(): void {
    this.loadComplaints();
    // Set up automatic refresh every 2 seconds to catch new complaints
    this.refreshInterval = setInterval(() => {
      this.refreshComplaints();
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadComplaints() {
    this.loading = true;
    this.error = '';
    
    try {
      // Get complaints from service
      this.complaints = this.complaintService.getComplaints();
      this.loading = false;
      
      console.log('Complaints loaded:', this.complaints);
    } catch (error) {
      this.loading = false;
      this.error = 'Error loading complaints';
      console.error('Error loading complaints:', error);
    }
  }

  // Refresh complaints without loading state
  refreshComplaints() {
    try {
      const currentComplaints = this.complaintService.getComplaints();
      if (currentComplaints.length !== this.complaints.length) {
        this.complaints = currentComplaints;
        console.log('Complaints refreshed:', this.complaints);
      }
    } catch (error) {
      console.error('Error refreshing complaints:', error);
    }
  }

  updateStatus(id: number, status: string) {
    this.complaintService.updateStatus(id, status);
    // Refresh the complaints list
    this.complaints = this.complaintService.getComplaints();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Urgent': return 'bg-danger';
      case 'In Progress': return 'bg-warning';
      case 'Resolved': return 'bg-success';
      case 'Open': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }

  // Add new complaint method
  addNewComplaint() {
    const newComplaint: Complaint = {
      id: this.complaintService.getComplaintCount() + 1,
      name: 'New User',
      email: 'newuser@example.com',
      username: 'newuser',
      status: 'Open'
    };
    
    this.complaintService.addComplaint(newComplaint);
    this.complaints = this.complaintService.getComplaints();
  }

  // Load API data method
  loadData() {
    this.loading = true;
    this.error = '';
    
    // Try multiple API endpoints in case one fails
    const apiUrls = [
      'https://reqres.in/api/users',
      'https://api.github.com/users',
      'https://jsonplaceholder.typicode.com/users'
    ];

    this.tryApiCall(apiUrls, 0);
  }

  private tryApiCall(urls: string[], index: number) {
    if (index >= urls.length) {
      this.loading = false;
      this.error = 'All API endpoints failed. Using sample data.';
      return;
    }

    const url = urls[index];
    console.log(`Trying API: ${url}`);

    this.http.get(url).subscribe({
      next: (result: any) => {
        this.loading = false;
        
        // Handle different API response formats
        if (result.data) {
          // reqres.in format
          this.users = result.data;
        } else if (Array.isArray(result)) {
          // jsonplaceholder format
          this.users = result;
        } else {
          // github format or other
          this.users = Array.isArray(result) ? result : [result];
        }
        
        console.log('Users loaded from API:', this.users);
      },
      error: (error) => {
        console.error(`API ${url} failed:`, error);
        // Try next API endpoint
        this.tryApiCall(urls, index + 1);
      }
    });
  }

  // Load mock data method
  loadMockData() {
    this.loading = false;
    this.error = '';
    this.users = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        username: 'janesmith'
      },
      {
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        username: 'bobjohnson'
      },
      {
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        username: 'alicebrown'
      },
      {
        name: 'Charlie Wilson',
        email: 'charlie.wilson@example.com',
        username: 'charliewilson'
      }
    ];
    console.log('Mock data loaded:', this.users);
  }
}
