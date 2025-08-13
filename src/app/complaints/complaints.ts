import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintService, Complaint } from '../complaint.service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaints.html',
  styleUrl: './complaints.css'
})
export class Complaints implements OnInit, OnDestroy {
  complaintService = inject(ComplaintService);
  
  complaints: Complaint[] = [];
  loading = false;
  error = '';
  private refreshInterval: any;

  ngOnInit(): void {
    this.loadComplaints();
    // Set up automatic refresh every 2 seconds to catch new complaints faster
    this.refreshInterval = setInterval(() => {
      this.checkForNewComplaints();
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

  checkForNewComplaints() {
    try {
      const currentComplaints = this.complaintService.getComplaints();
      
      // Check if there are new complaints (by length or by comparing IDs)
      const hasNewComplaints = currentComplaints.length !== this.complaints.length ||
        currentComplaints.some((complaint, index) => 
          !this.complaints[index] || complaint.id !== this.complaints[index].id
        );
      
      if (hasNewComplaints) {
        console.log('New complaints detected! Updating display...');
        console.log('Previous count:', this.complaints.length);
        console.log('Current count:', currentComplaints.length);
        this.complaints = [...currentComplaints]; // Create a new array reference
        console.log('Updated complaints:', this.complaints);
      }
    } catch (error) {
      console.error('Error checking for new complaints:', error);
    }
  }

  refreshComplaints() {
    console.log('Manual refresh triggered');
    this.loadComplaints();
  }

  updateStatus(id: number, status: string) {
    this.complaintService.updateStatus(id, status);
    this.complaints = this.complaintService.getComplaints();
    console.log(`Status updated for complaint ${id} to ${status}`);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'In Progress': return 'bg-warning';
      case 'Resolved': return 'bg-success';
      case 'Open': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }

  getCategoryBadgeClass(category: string | undefined): string {
    if (!category) return 'bg-secondary';
    
    switch (category) {
      case 'ID Card': return 'bg-info';
      case 'Laptop': return 'bg-warning';
      case 'Wallet': return 'bg-success';
      case 'Books': return 'bg-primary';
      case 'Others': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  // Computed properties for statistics
  get openComplaintsCount(): number {
    return this.complaints.filter(c => c.status === 'Open').length;
  }

  get inProgressComplaintsCount(): number {
    return this.complaints.filter(c => c.status === 'In Progress').length;
  }

  get resolvedComplaintsCount(): number {
    return this.complaints.filter(c => c.status === 'Resolved').length;
  }
}
