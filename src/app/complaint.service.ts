import { Injectable } from '@angular/core';

export interface Complaint {
  id: number;
  name: string;
  email: string;
  username: string;
  status: string;
  category?: string;
  lostItem?: string;
  description?: string;
  lostPlace?: string;
  proofOfOwnership?: string;
  time?: string;
  date?: string;
  imageUrl?: string;
  // New student fields
  rollNumber?: string;
  department?: string;
  year?: string;
  phoneNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private complaints: Complaint[]= [];

  constructor() { 
    // No sample data loaded - reports page will start empty
    console.log('ComplaintService initialized with empty complaints array');
  }

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

  // Get complaints by department
  getComplaintsByDepartment(department: string): Complaint[] {
    return this.complaints.filter(c => c.department === department);
  }

  // Get department statistics
  getDepartmentStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    this.complaints.forEach(complaint => {
      if (complaint.department) {
        stats[complaint.department] = (stats[complaint.department] || 0) + 1;
      }
    });
    return stats;
  }

  // Load sample data
  loadSampleData() {
    this.complaints = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        username: 'johndoe',
        status: 'Open',
        category: 'Laptop',
        lostItem: 'MacBook Pro',
        description: 'Lost my laptop in the library',
        lostPlace: 'Library',
        proofOfOwnership: 'SN: MB123456',
        time: '14:30',
        date: '2024-01-15',
        rollNumber: 'CS001',
        department: 'Computer Science',
        year: '3rd Year',
        phoneNumber: '9876543210'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        username: 'janesmith',
        status: 'In Progress',
        category: 'ID Card',
        lostItem: 'Student ID Card',
        description: 'Lost my student ID card in the cafeteria',
        lostPlace: 'Cafeteria',
        proofOfOwnership: 'ID: 2024001',
        time: '12:00',
        date: '2024-01-14',
        rollNumber: 'IT002',
        department: 'Information Technology',
        year: '2nd Year',
        phoneNumber: '9876543211'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        username: 'bobjohnson',
        status: 'Resolved',
        category: 'Wallet',
        lostItem: 'Leather Wallet',
        description: 'Found my wallet in the lost and found',
        lostPlace: 'Parking Lot',
        proofOfOwnership: 'Contains driver license',
        time: '09:15',
        date: '2024-01-13',
        rollNumber: 'ME003',
        department: 'Mechanical',
        year: '4th Year',
        phoneNumber: '9876543212'
      }
    ];
    console.log('Sample complaints loaded:', this.complaints);
  }
} 