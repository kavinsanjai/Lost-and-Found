import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-complaint.html',
  styleUrls: ['./register-complaint.css']
})
export class RegisterComplaint {

  complaintCategories = ['ID Card', 'Laptop', 'Wallet', 'Books', 'Others'];
  selectedCategory: string = '';
  studentName: string = '';
  lostItem: string = '';
  complaintText: string = '';
  lostPlace: string = '';
  proofOfOwnership: string = '';
  time: string = '';
  imageUrl: string = '';
  submitted = false;
  date: string = new Date().toLocaleDateString(); // autofill date

  submitComplaint() {
    if (this.studentName && this.lostItem && this.selectedCategory && this.complaintText && this.lostPlace) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.clearForm();
      }, 3000);
    }
  }

  clearForm() {
    this.studentName = '';
    this.lostItem = '';
    this.selectedCategory = '';
    this.complaintText = '';
    this.lostPlace = '';
    this.proofOfOwnership = '';
    this.time = '';
    this.imageUrl = '';
  }
}
