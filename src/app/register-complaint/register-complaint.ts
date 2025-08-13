import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService, Complaint } from '../complaint.service';

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-complaint.html',
  styleUrls: ['./register-complaint.css']
})
export class RegisterComplaint {
  complaintService = inject(ComplaintService);

  // Student Information
  studentName: string = '';
  rollNumber: string = '';
  department: string = '';
  year: string = '';
  phoneNumber: string = '';
  email: string = '';

  // Item Information
  complaintCategories = ['ID Card', 'Laptop', 'Wallet', 'Books', 'Others'];
  selectedCategory: string = '';
  lostItem: string = '';
  complaintText: string = '';

  // Location and Time
  lostPlace: string = '';
  proofOfOwnership: string = '';
  time: string = '';
  date: string = new Date().toISOString().split('T')[0]; // Today's date

  // Additional Information
  imageUrl: string = '';

  // Form State
  submitted = false;
  lastComplaintId: number = 0;

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'ID Card': return 'fas fa-id-card';
      case 'Laptop': return 'fas fa-laptop';
      case 'Wallet': return 'fas fa-wallet';
      case 'Books': return 'fas fa-book';
      case 'Others': return 'fas fa-box';
      default: return 'fas fa-question';
    }
  }

  isFormValid(): boolean {
    const isValid = !!(
      this.studentName && 
      this.rollNumber && 
      this.department && 
      this.year && 
      this.phoneNumber && 
      this.email && 
      this.lostItem && 
      this.selectedCategory && 
      this.complaintText && 
      this.lostPlace && 
      this.date && 
      this.time && 
      this.proofOfOwnership &&
      this.complaintText.length >= 10
    );
    
    console.log('Form validation result:', isValid);
    console.log('Form data check:', {
      studentName: !!this.studentName,
      rollNumber: !!this.rollNumber,
      department: !!this.department,
      year: !!this.year,
      phoneNumber: !!this.phoneNumber,
      email: !!this.email,
      lostItem: !!this.lostItem,
      selectedCategory: !!this.selectedCategory,
      complaintText: !!this.complaintText,
      lostPlace: !!this.lostPlace,
      date: !!this.date,
      time: !!this.time,
      proofOfOwnership: !!this.proofOfOwnership,
      textLength: this.complaintText.length
    });
    
    return isValid;
  }

  submitComplaint() {
    console.log('Submit complaint method called');
    
    // Simple validation - just check if basic fields are filled
    if (this.studentName && this.lostItem && this.selectedCategory) {
      console.log('Submitting complaint...');
      
      // Create a new complaint object with all the form data
      const newComplaint: Complaint = {
        id: this.complaintService.getComplaintCount() + 1,
        name: this.studentName,
        email: this.email || `${this.studentName.toLowerCase().replace(' ', '.')}@example.com`,
        username: this.rollNumber || this.studentName.toLowerCase().replace(' ', ''),
        status: 'Open',
        category: this.selectedCategory,
        lostItem: this.lostItem,
        description: this.complaintText || 'No description provided',
        lostPlace: this.lostPlace || 'Unknown location',
        proofOfOwnership: this.proofOfOwnership || 'Not provided',
        time: this.time || 'Unknown time',
        date: this.date || new Date().toISOString().split('T')[0],
        imageUrl: this.imageUrl,
        // New fields
        rollNumber: this.rollNumber || 'N/A',
        department: this.department || 'Not specified',
        year: this.year || 'Not specified',
        phoneNumber: this.phoneNumber || 'Not provided'
      };
      
      // Add complaint to service
      this.complaintService.addComplaint(newComplaint);
      
      this.lastComplaintId = newComplaint.id;
      this.submitted = true;
      
      console.log('Complaint submitted successfully!');
      console.log('Complaint ID:', newComplaint.id);
      console.log('Total complaints in service:', this.complaintService.getComplaintCount());
      console.log('Complaint data:', newComplaint);
      
      // Show success alert
      alert(`✅ Complaint Submitted Successfully!\n\nComplaint ID: #${newComplaint.id}\nStudent: ${newComplaint.name}\nItem: ${newComplaint.lostItem}\nCategory: ${newComplaint.category}\n\nYour complaint has been registered and will appear in the reports page.`);
      
      // Clear form immediately
      this.clearForm();
      console.log('Form cleared immediately after submission');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.submitted = false;
        console.log('Success message cleared');
      }, 3000);
    } else {
      console.log('Form validation failed - missing basic fields');
      console.log('Form data:', {
        studentName: this.studentName,
        lostItem: this.lostItem,
        selectedCategory: this.selectedCategory
      });
      alert('❌ Please fill in at least: Student Name, Lost Item, and Category');
    }
  }

  testSubmit() {
    console.log('Test submit method called');
    
    // Create a test complaint with minimal data
    const testComplaint: Complaint = {
      id: this.complaintService.getComplaintCount() + 1,
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
      status: 'Open',
      category: 'Others',
      lostItem: 'Test Item',
      description: 'This is a test complaint',
      lostPlace: 'Test Location',
      proofOfOwnership: 'Test Proof',
      time: '12:00',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      rollNumber: 'TEST001',
      department: 'Computer Science',
      year: '3rd Year',
      phoneNumber: '1234567890'
    };
    
    // Add complaint to service
    this.complaintService.addComplaint(testComplaint);
    
    this.lastComplaintId = testComplaint.id;
    this.submitted = true;
    
    console.log('Test complaint submitted successfully!');
    console.log('Test Complaint ID:', testComplaint.id);
    console.log('Total complaints in service:', this.complaintService.getComplaintCount());
    
    // Show success alert for test submission
    alert(`✅ Test Complaint Submitted Successfully!\n\nComplaint ID: #${testComplaint.id}\nStudent: ${testComplaint.name}\nItem: ${testComplaint.lostItem}\nCategory: ${testComplaint.category}\n\nThis test complaint has been added to the system.`);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      this.submitted = false;
      console.log('Test success message cleared');
    }, 3000);
  }

  clearForm() {
    // Student Information
    this.studentName = '';
    this.rollNumber = '';
    this.department = '';
    this.year = '';
    this.phoneNumber = '';
    this.email = '';

    // Item Information
    this.selectedCategory = '';
    this.lostItem = '';
    this.complaintText = '';

    // Location and Time
    this.lostPlace = '';
    this.proofOfOwnership = '';
    this.time = '';
    this.date = new Date().toISOString().split('T')[0];

    // Additional Information
    this.imageUrl = '';
  }
}
