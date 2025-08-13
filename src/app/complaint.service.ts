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

  private complaints: Complaint[] = [];
  private readonly STORAGE_KEY = 'complaints_data';

  constructor() { 
    // Load complaints from localStorage on service initialization
    this.loadComplaintsFromStorage();
    console.log('ComplaintService initialized with complaints from localStorage:', this.complaints.length);
  }

  // Load complaints from localStorage
  private loadComplaintsFromStorage() {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        this.complaints = JSON.parse(storedData);
        console.log('Loaded complaints from localStorage:', this.complaints.length);
      } else {
        this.complaints = [];
        console.log('No stored complaints found, starting with empty array');
      }
    } catch (error) {
      console.error('Error loading complaints from localStorage:', error);
      this.complaints = [];
    }
  }

  // Save complaints to localStorage
  private saveComplaintsToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.complaints));
      console.log('Saved complaints to localStorage:', this.complaints.length);
    } catch (error) {
      console.error('Error saving complaints to localStorage:', error);
    }
  }

  // Get all complaints
  getComplaints(): Complaint[] {
    return this.complaints;
  }

  // Add new complaint
  addComplaint(complaint: Complaint) {
    this.complaints.push(complaint);
    this.saveComplaintsToStorage(); // Save to localStorage after adding
    console.log('Complaint added and saved to localStorage:', complaint);
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
      this.saveComplaintsToStorage(); // Save to localStorage after updating
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

  // Clear all complaints (for testing/reset)
  clearAllComplaints() {
    this.complaints = [];
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('All complaints cleared from localStorage');
  }

  // Load sample data (for testing purposes only)
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
    this.saveComplaintsToStorage(); // Save sample data to localStorage
    console.log('Sample complaints loaded and saved to localStorage:', this.complaints);
  }
} 