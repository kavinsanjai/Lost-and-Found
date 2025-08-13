import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ComplaintService } from '../complaint.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
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
    
    // Update status chart (Lost vs Found/Resolved)
    const openCount = complaints.filter(c => c.status === 'Open').length;
    const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
    const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
    
    this.chartData = [
      { "name": "Open", "value": openCount },
      { "name": "In Progress", "value": inProgressCount },
      { "name": "Resolved", "value": resolvedCount }
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
      status: this.chartData,
      departments: this.departmentData,
      categories: this.categoryData
    });
  }
}
