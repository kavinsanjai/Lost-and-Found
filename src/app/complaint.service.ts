import { Injectable } from '@angular/core';

export interface Complaint {
  id: number;
  name: string;
  email: string;
  username: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  
  private complaints: Complaint[]= [];

  constructor() { }

  // Get all complaints
  getComplaints(): Complaint[] {
    return this.complaints;
  }

  // Add new complaint
  addComplaint(complaint: Complaint) {
    this.complaints.push(complaint);
    console.log('Complaint added:', complaint);
  }

  // Get complaint by ID
  getComplaintById(id: number): Complaint | undefined {
    return this.complaints.find(c => c.id === id);
  }

  // Update complaint status
  updateStatus(id: number, status: string) {
    const complaint = this.getComplaintById(id);
    if (complaint) {
      complaint.status = status;
      console.log('Status updated for complaint', id, 'to', status);
    }
  }

  // Get complaint count
  getComplaintCount(): number {
    return this.complaints.length;
  }

  // Load sample data
  loadSampleData() {
    this.complaints = [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe', status: 'Open' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith', status: 'In Progress' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', username: 'bobjohnson', status: 'Resolved' }
    ];
    console.log('Sample complaints loaded:', this.complaints);
  }
} 