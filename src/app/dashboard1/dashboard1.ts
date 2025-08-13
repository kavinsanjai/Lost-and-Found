import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { ComplaintService } from '../complaint.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './dashboard1.html',
  styleUrls: ['./dashboard1.css']
})
export class Dashboard1 implements OnInit, OnDestroy {
  complaintService = inject(ComplaintService);

  view: [number, number] = [350, 350];
  colorScheme: string = 'vivid';
  private refreshInterval: any;

  // Chart data
  chartData: any[] = [];
  departmentData: any[] = [];
  categoryData: any[] = [];

  // Statistics properties
  totalComplaints: number = 0;
  openComplaints: number = 0;
  inProgressComplaints: number = 0;
  resolvedComplaints: number = 0;
  closedComplaints: number = 0;
  resolutionRate: number = 0;
  uniqueDepartments: number = 0;
  uniqueCategories: number = 0;

  ngOnInit(): void {
    this.updateChartData();
    // Refresh data every 5 seconds
    this.refreshInterval = setInterval(() => {
      this.updateChartData();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  updateChartData() {
    const complaints = this.complaintService.getComplaints();
    
    // Update basic statistics
    this.totalComplaints = complaints.length;
    this.openComplaints = complaints.filter(c => c.status === 'Open').length;
    this.inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;
    this.resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
    this.closedComplaints = complaints.filter(c => c.status === 'Closed').length;
    
    // Calculate resolution rate
    const resolvedCount = this.resolvedComplaints + this.closedComplaints;
    this.resolutionRate = this.totalComplaints > 0 ? Math.round((resolvedCount / this.totalComplaints) * 100) : 0;
    
    // Count unique departments and categories
    const departments = new Set(complaints.map(c => c.department).filter(d => d));
    const categories = new Set(complaints.map(c => c.category).filter(c => c));
    this.uniqueDepartments = departments.size;
    this.uniqueCategories = categories.size;
    
    // Update status chart (Lost vs Found/Resolved)
    this.chartData = [
      { "name": "Open", "value": this.openComplaints },
      { "name": "In Progress", "value": this.inProgressComplaints },
      { "name": "Resolved", "value": this.resolvedComplaints },
      { "name": "Closed", "value": this.closedComplaints }
    ];

    // Update department chart
    const departmentStats = this.complaintService.getDepartmentStats();
    this.departmentData = Object.keys(departmentStats).map(dept => ({
      "name": dept,
      "value": departmentStats[dept]
    }));

    // Update category chart
    const categoryStats: { [key: string]: number } = {};
    complaints.forEach(complaint => {
      if (complaint.category) {
        categoryStats[complaint.category] = (categoryStats[complaint.category] || 0) + 1;
      }
    });
    
    this.categoryData = Object.keys(categoryStats).map(category => ({
      "name": category,
      "value": categoryStats[category]
    }));

    console.log('Dashboard data updated:', {
      total: this.totalComplaints,
      open: this.openComplaints,
      inProgress: this.inProgressComplaints,
      resolved: this.resolvedComplaints,
      closed: this.closedComplaints,
      resolutionRate: this.resolutionRate,
      departments: this.uniqueDepartments,
      categories: this.uniqueCategories,
      statusChart: this.chartData,
      departmentChart: this.departmentData,
      categoryChart: this.categoryData
    });
  }
}
