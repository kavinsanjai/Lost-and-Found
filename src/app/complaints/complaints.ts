import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService, Complaint } from '../complaint.service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaints.html',
  styleUrl: './complaints.css'
})
export class Complaints implements OnInit {
  http = inject(HttpClient);
  complaintService = inject(ComplaintService);
  cdr = inject(ChangeDetectorRef);
  
  users: any[] = [];           
  complaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];
  loading = false;
  error = '';

  // Statistics properties
  openComplaintsCount: number = 0;
  inProgressComplaintsCount: number = 0;
  resolvedComplaintsCount: number = 0;
  closedComplaintsCount: number = 0;

  // Sorting and filtering properties
  currentSortBy: string = 'date';
  currentSortOrder: string = 'desc';
  currentStatusFilter: string = 'all';
  currentCategoryFilter: string = 'all';
  
  sortOptions = [
    { value: 'date', label: 'Date Submitted', icon: 'fas fa-calendar-alt' },
    { value: 'name', label: 'Student Name', icon: 'fas fa-user' },
    { value: 'status', label: 'Status', icon: 'fas fa-flag' },
    { value: 'category', label: 'Category', icon: 'fas fa-tags' },
    { value: 'department', label: 'Department', icon: 'fas fa-building' }
  ];

  statusOptions = [
    { value: 'all', label: 'All Statuses', icon: 'fas fa-list' },
    { value: 'Open', label: 'Open', icon: 'fas fa-folder-open' },
    { value: 'In Progress', label: 'In Progress', icon: 'fas fa-clock' },
    { value: 'Resolved', label: 'Resolved', icon: 'fas fa-check-circle' },
    { value: 'Closed', label: 'Closed', icon: 'fas fa-times-circle' }
  ];

  categoryOptions = [
    { value: 'all', label: 'All Categories', icon: 'fas fa-th-large' },
    { value: 'Electronics', label: 'Electronics', icon: 'fas fa-laptop' },
    { value: 'Books', label: 'Books', icon: 'fas fa-book' },
    { value: 'Clothing', label: 'Clothing', icon: 'fas fa-tshirt' },
    { value: 'Accessories', label: 'Accessories', icon: 'fas fa-watch' },
    { value: 'Documents', label: 'Documents', icon: 'fas fa-file-alt' },
    { value: 'ID Card', label: 'ID Card', icon: 'fas fa-id-card' },
    { value: 'Others', label: 'Others', icon: 'fas fa-question-circle' }
  ];

  // Staff contact information
  staffContacts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Lost & Found Coordinator',
      department: 'Student Affairs',
      email: 'sarah.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      office: 'Student Center - Room 205',
      availability: 'Mon-Fri: 9:00 AM - 5:00 PM',
      specialization: 'Electronics, Documents'
    },
    {
      id: 2,
      name: 'Mr. David Chen',
      role: 'Security Supervisor',
      department: 'Campus Security',
      email: 'david.chen@university.edu',
      phone: '+1 (555) 234-5678',
      office: 'Security Office - Main Building',
      availability: 'Mon-Sun: 24/7 Available',
      specialization: 'All Categories'
    },
    {
      id: 3,
      name: 'Ms. Emily Rodriguez',
      role: 'Student Services Assistant',
      department: 'Student Affairs',
      email: 'emily.rodriguez@university.edu',
      phone: '+1 (555) 345-6789',
      office: 'Student Center - Room 210',
      availability: 'Mon-Fri: 8:00 AM - 4:00 PM',
      specialization: 'Books, Clothing, Accessories'
    }
  ];

  // Item Found Modal properties
  showItemFoundModal = false;
  selectedComplaint: Complaint | null = null;
  itemFoundForm = {
    finderName: '',
    finderRollNo: '',
    itemImage: null as File | null,
    itemImageUrl: '',
    additionalNotes: ''
  };
  showSubmissionInfo = false;
  
  // Track items that have been reported as found
  foundItemsReported: Set<number> = new Set();

  ngOnInit(): void {
    // Load complaints from service (no sample data)
    this.loadComplaintsFromService();
    
    // Load previously reported found items
    this.loadFoundItemsData();

  // Ensure statuses reflect persisted found items after reload
  this.reconcileFoundItemsWithStatus();
  }

  // Load found items data from storage
  loadFoundItemsData() {
    const findersData = JSON.parse(localStorage.getItem('foundItemsData') || '{}');
    this.foundItemsReported = new Set(Object.keys(findersData).map(id => parseInt(id)));
    console.log('Loaded found items:', this.foundItemsReported);
  }

  // Ensure complaint statuses match persisted "item found" records
  reconcileFoundItemsWithStatus() {
    const findersData = JSON.parse(localStorage.getItem('foundItemsData') || '{}');
    const ids = Object.keys(findersData).map(id => parseInt(id, 10));
    if (ids.length === 0) return;

    let changed = false;
    ids.forEach(id => {
      const c = this.complaints.find(x => x.id === id);
      if (!c) return;
      if (c.status !== 'In Progress' && c.status !== 'Resolved' && c.status !== 'Closed') {
        this.complaintService.updateStatus(id, 'In Progress');
        changed = true;
      }
    });

    if (changed) {
      this.complaints = this.complaintService.getComplaints();
      this.applyFiltersAndSorting();
      this.calculateStatistics();
    }
  }

  // Using the ComplaintService
  loadComplaintsFromService() {
    // Get complaints from service (no sample data loading)
    this.complaints = this.complaintService.getComplaints();
    this.filteredComplaints = [...this.complaints];
    
    // Calculate statistics
    this.calculateStatistics();
    
    // Apply current sorting and filtering
    this.applyFiltersAndSorting();
    
    // Get complaint count
    const count = this.complaintService.getComplaintCount();
    console.log('Total complaints:', count);
  }

  // Apply sorting and filtering
  applyFiltersAndSorting() {
    let filtered = [...this.complaints];

    // Apply status filter
    if (this.currentStatusFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === this.currentStatusFilter);
    }

    // Apply category filter
    if (this.currentCategoryFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.category === this.currentCategoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (this.currentSortBy) {
        case 'date':
          comparison = new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
          break;
        case 'name':
          comparison = (a.name || '').localeCompare(b.name || '');
          break;
        case 'status':
          comparison = (a.status || '').localeCompare(b.status || '');
          break;
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '');
          break;
        case 'department':
          comparison = (a.department || '').localeCompare(b.department || '');
          break;
        default:
          comparison = 0;
      }

      return this.currentSortOrder === 'desc' ? comparison : -comparison;
    });

    this.filteredComplaints = filtered;
  }

  // Sorting functions
  setSortBy(sortBy: string) {
    if (this.currentSortBy === sortBy) {
      // Toggle sort order if same field
      this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortBy = sortBy;
      this.currentSortOrder = 'desc';
    }
    this.applyFiltersAndSorting();
  }

  setStatusFilter(status: string) {
    this.currentStatusFilter = status;
    this.applyFiltersAndSorting();
  }

  setCategoryFilter(category: string) {
    this.currentCategoryFilter = category;
    this.applyFiltersAndSorting();
  }

  // Get profile icon based on student info
  getProfileIcon(complaint: Complaint): string {
    const department = complaint.department?.toLowerCase() || '';
    const year = complaint.year || '';
    
    // Department-based icons
    if (department.includes('computer') || department.includes('it') || department.includes('software')) {
      return 'fas fa-laptop-code';
    } else if (department.includes('mechanical') || department.includes('civil') || department.includes('electrical')) {
      return 'fas fa-hard-hat';
    } else if (department.includes('business') || department.includes('management') || department.includes('mba')) {
      return 'fas fa-briefcase';
    } else if (department.includes('arts') || department.includes('design')) {
      return 'fas fa-palette';
    } else if (department.includes('medical') || department.includes('nursing')) {
      return 'fas fa-user-md';
    } else if (year && year.includes('1')) {
      return 'fas fa-user-graduate';
    } else if (year && (year.includes('3') || year.includes('4'))) {
      return 'fas fa-user-tie';
    }
    
    return 'fas fa-user';
  }

  // Get profile background color
  getProfileBgColor(complaint: Complaint): string {
    const department = complaint.department?.toLowerCase() || '';
    
    // Department-based color mapping
    if (department.includes('computer') || department.includes('it') || department.includes('software')) {
      return 'bg-computer';
    } else if (department.includes('mechanical') || department.includes('civil') || department.includes('electrical')) {
      return 'bg-mechanical';
    } else if (department.includes('business') || department.includes('management') || department.includes('mba')) {
      return 'bg-business';
    } else if (department.includes('arts') || department.includes('design')) {
      return 'bg-arts';
    } else if (department.includes('medical') || department.includes('nursing')) {
      return 'bg-medical';
    }
    
    // Fallback to name-based colors for consistent assignment
    const name = complaint.name?.toLowerCase() || '';
    const colors = [
      'bg-primary', 'bg-success', 'bg-info', 'bg-warning', 
      'bg-danger', 'bg-secondary', 'bg-dark'
    ];
    
    // Use first letter to determine color consistently
    const index = name.charCodeAt(0) % colors.length;
    return colors[index] || 'bg-primary';
  }

  // Helper methods for template
  getCurrentSortIcon(): string {
    const option = this.sortOptions.find(opt => opt.value === this.currentSortBy);
    return option?.icon || 'fas fa-sort';
  }

  getCurrentSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.currentSortBy);
    return option?.label || 'Select Sort';
  }

  getCurrentStatusIcon(): string {
    const option = this.statusOptions.find(opt => opt.value === this.currentStatusFilter);
    return option?.icon || 'fas fa-list';
  }

  getCurrentStatusLabel(): string {
    const option = this.statusOptions.find(opt => opt.value === this.currentStatusFilter);
    return option?.label || 'All Statuses';
  }

  getCurrentCategoryIcon(): string {
    const option = this.categoryOptions.find(opt => opt.value === this.currentCategoryFilter);
    return option?.icon || 'fas fa-th-large';
  }

  getCurrentCategoryLabel(): string {
    const option = this.categoryOptions.find(opt => opt.value === this.currentCategoryFilter);
    return option?.label || 'All Categories';
  }

  // Get assigned staff member for a complaint
  getAssignedStaff(complaint: Complaint) {
    const category = complaint.category?.toLowerCase() || '';
    
    // Assign staff based on category specialization
    if (category.includes('electronics') || category.includes('documents') || category.includes('id card')) {
      return this.staffContacts[0]; // Dr. Sarah Johnson
    } else if (category.includes('books') || category.includes('clothing') || category.includes('accessories')) {
      return this.staffContacts[2]; // Ms. Emily Rodriguez
    } else {
      return this.staffContacts[1]; // Mr. David Chen (default for all categories)
    }
  }

  // Item Found Modal Functions
  openItemFoundModal(complaint: Complaint) {
    this.selectedComplaint = complaint;
    this.showItemFoundModal = true;
    this.showSubmissionInfo = false;
    this.resetItemFoundForm();
  }

  closeItemFoundModal() {
    this.showItemFoundModal = false;
    this.showSubmissionInfo = false;
    this.selectedComplaint = null;
    this.resetItemFoundForm();
  }

  resetItemFoundForm() {
    this.itemFoundForm = {
      finderName: '',
      finderRollNo: '',
      itemImage: null,
      itemImageUrl: '',
      additionalNotes: ''
    };
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.itemFoundForm.itemImage = file;
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.itemFoundForm.itemImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit item found form
  submitItemFound() {
    if (!this.selectedComplaint) return;

    const id = this.selectedComplaint.id;

    // 1) Immediately show success screen
    this.showSubmissionInfo = true;
    this.cdr.detectChanges();

    // 2) Persist data and update counters/status asynchronously to avoid UI flicker
    this.foundItemsReported.add(id);
    this.storeFindersInformation(id, this.itemFoundForm);

    setTimeout(() => {
      // Update the complaint status to "In Progress" and refresh stats
      this.updateStatus(id, 'In Progress');
    }, 0);
  }

  // Calculate statistics based on complaint status

  // Store finder information for the complaint
  storeFindersInformation(complaintId: number, finderInfo: any) {
    // In a real application, this would be sent to a backend service
    // For now, we'll store it in localStorage for demonstration
    const findersData = JSON.parse(localStorage.getItem('foundItemsData') || '{}');
    findersData[complaintId] = {
      ...finderInfo,
      reportedAt: new Date().toISOString(),
      complaintId: complaintId
    };
    localStorage.setItem('foundItemsData', JSON.stringify(findersData));
    console.log('Finder information stored:', findersData[complaintId]);
  }

  // Check if an item has been reported as found
  isItemReportedAsFound(complaintId: number): boolean {
    return this.foundItemsReported.has(complaintId) || 
           !!JSON.parse(localStorage.getItem('foundItemsData') || '{}')[complaintId];
  }

  // Get finder information for a complaint
  getFinderInfo(complaintId: number) {
    const findersData = JSON.parse(localStorage.getItem('foundItemsData') || '{}');
    return findersData[complaintId] || null;
  }

  isItemFoundFormValid(): boolean {
    return !!(this.itemFoundForm.finderName?.trim() && 
              this.itemFoundForm.finderRollNo?.trim() && 
              this.itemFoundForm.itemImage);
  }

  // Calculate statistics based on complaint status
  calculateStatistics() {
    this.openComplaintsCount = this.complaints.filter(c => c.status === 'Open').length;
    this.inProgressComplaintsCount = this.complaints.filter(c => c.status === 'In Progress').length;
    this.resolvedComplaintsCount = this.complaints.filter(c => c.status === 'Resolved').length;
    this.closedComplaintsCount = this.complaints.filter(c => c.status === 'Closed').length;
    
    console.log('Statistics calculated:', {
      open: this.openComplaintsCount,
      inProgress: this.inProgressComplaintsCount,
      resolved: this.resolvedComplaintsCount,
      closed: this.closedComplaintsCount
    });
  }

  // Refresh complaints and recalculate statistics
  refreshComplaints() {
    this.loadComplaintsFromService();
  }

  // Calculate resolution rate percentage
  getResolutionRate(): number {
    if (this.complaints.length === 0) return 0;
    const resolvedCount = this.resolvedComplaintsCount + this.closedComplaintsCount;
    return Math.round((resolvedCount / this.complaints.length) * 100);
  }

  // Calculate average response time (mock calculation)
  getAverageResponseTime(): number {
    if (this.complaints.length === 0) return 0;
    // Mock calculation - in real app this would be based on actual timestamps
    return Math.round(this.complaints.length * 1.5);
  }

  // Calculate efficiency score based on resolved vs total complaints
  getEfficiencyScore(): number {
    if (this.complaints.length === 0) return 0;
    const resolvedCount = this.resolvedComplaintsCount + this.closedComplaintsCount;
    const efficiency = (resolvedCount / this.complaints.length) * 100;
    return Math.round(Math.min(efficiency + 20, 100)); // Add 20% bonus for good performance
  }

  // Get unique departments count
  getUniqueDepartments(): number {
    const departments = new Set(this.complaints.map(c => c.department).filter(d => d));
    return departments.size;
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
    // Recalculate statistics after adding new complaint
    this.calculateStatistics();
  }

  // Update complaint status
  updateStatus(complaintId: number, newStatus: string) {
    this.complaintService.updateStatus(complaintId, newStatus);
    this.complaints = this.complaintService.getComplaints();
    this.filteredComplaints = [...this.complaints];
    // Recalculate statistics after status update
    this.calculateStatistics();
    // Reapply filters after update
    this.applyFiltersAndSorting();
  }

  // Get badge class for category
  getCategoryBadgeClass(category: string | undefined): string {
    if (!category) return 'bg-secondary';
    
    const categoryClasses: { [key: string]: string } = {
      'Electronics': 'bg-primary',
      'Books': 'bg-info',
      'Clothing': 'bg-warning',
      'Accessories': 'bg-secondary',
      'Documents': 'bg-danger',
      'Other': 'bg-dark',
      'ID Card': 'bg-info',
      'Laptop': 'bg-primary',
      'Wallet': 'bg-warning',
      'Others': 'bg-dark'
    };
    return categoryClasses[category] || 'bg-secondary';
  }

  // Get badge class for status
  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Open': 'bg-warning',
      'In Progress': 'bg-info',
      'Resolved': 'bg-success',
      'Closed': 'bg-secondary',
      'Urgent': 'bg-danger'
    };
    return statusClasses[status] || 'bg-secondary';
  }
}
