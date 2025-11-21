import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LostItem {
  id: number;
  name: string;
  category: string;
  dateLost: string;
  location: string;
  status: 'Pending' | 'Found' | 'Claimed';
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface FoundItem {
  id: number;
  name: string;
  category: string;
  dateFound: string;
  location: string;
  status: 'Pending' | 'Claimed';
  icon: string;
  iconBg: string;
  iconColor: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  // User info
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 (555) 123-4567',
    id: 'CS2023-124',
    department: 'Computer Science',
    memberSince: 'January 12, 2023',
    avatar: 'JD'
  };

  // Lost items
  lostItems: LostItem[] = [
    {
      id: 1,
      name: 'MacBook Pro',
      category: 'Electronics',
      dateLost: 'Aug 24, 2025',
      location: 'Main Library',
      status: 'Pending',
      icon: 'fas fa-laptop',
      iconBg: 'bg-light-blue',
      iconColor: 'text-primary'
    },
    {
      id: 2,
      name: 'Wallet',
      category: 'Personal Item',
      dateLost: 'Aug 15, 2025',
      location: 'Cafeteria',
      status: 'Found',
      icon: 'fas fa-wallet',
      iconBg: 'bg-light-purple',
      iconColor: 'text-purple'
    }
  ];

  // Found items
  foundItems: FoundItem[] = [
    {
      id: 1,
      name: 'Textbook',
      category: 'Book',
      dateFound: 'Aug 30, 2025',
      location: 'Room 301',
      status: 'Claimed',
      icon: 'fas fa-book',
      iconBg: 'bg-light-green',
      iconColor: 'text-success'
    },
    {
      id: 2,
      name: 'Student ID Card',
      category: 'Identification',
      dateFound: 'Aug 22, 2025',
      location: 'Sports Complex',
      status: 'Pending',
      icon: 'fas fa-id-card',
      iconBg: 'bg-light-orange',
      iconColor: 'text-orange'
    }
  ];

  // Form data
  passwordData = {
    current: '',
    new: '',
    confirm: ''
  };

  notificationSettings = {
    email: true,
    itemMatch: true,
    statusUpdates: false
  };

  constructor() {}

  ngOnInit(): void {
    // You can load user data from a service or local storage here
  }

  updatePassword(): void {
    // Password validation logic
    if (this.passwordData.new !== this.passwordData.confirm) {
      alert('New passwords do not match!');
      return;
    }
    
    // Implementation for password change would go here
    alert('Password updated successfully!');
    this.passwordData = { current: '', new: '', confirm: '' };
  }

  saveNotificationSettings(): void {
    // Save notification preferences to user profile
    alert('Notification settings saved!');
  }

  viewItem(itemType: string, id: number): void {
    // Navigate to item details page
    console.log(`Viewing ${itemType} item #${id}`);
  }

  deleteItem(itemType: string, id: number): void {
    // Delete item from list
    if (itemType === 'lost') {
      this.lostItems = this.lostItems.filter(item => item.id !== id);
    } else {
      this.foundItems = this.foundItems.filter(item => item.id !== id);
    }
  }
}
