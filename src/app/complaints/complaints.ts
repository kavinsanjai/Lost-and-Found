import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService, Complaint } from '../complaint.service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaints.html',
  styleUrl: './complaints.css'
})
export class Complaints implements OnInit {
  http = inject(HttpClient);
  complaintService = inject(ComplaintService);
  
  users: any[] = [];           
  complaints: Complaint[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    // Load mock data immediately so table shows data
    this.loadMockData();
    // Load complaints from service
    this.loadComplaintsFromService();
  }

  // Using the ComplaintService
  loadComplaintsFromService() {
    // Load sample complaints
    this.complaintService.loadSampleData();
    
    // Get complaints from service
    this.complaints = this.complaintService.getComplaints();
    
    // Get complaint count
    const count = this.complaintService.getComplaintCount();
    console.log('Total complaints:', count);
    
    // Example: Update a complaint status
    this.complaintService.updateStatus(1, 'Urgent');
  }

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

  // Fallback method with mock data if all APIs fail
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

  // Example: Add a new complaint using service
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
}
