import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard1.html',
  styleUrls: ['./dashboard1.css']
})
export class Dashboard1 {

  view: [number, number] = [350, 350];
  colorScheme: string = 'vivid';

  // 1️⃣ Total Lost/Found
  chartData = [
    { "name": "Lost Items", "value": 12 },
    { "name": "Found Items", "value": 7 }
  ];

  // 2️⃣ Department-wise reports
  departmentData = [
    { "name": "CSE", "value": 8 },
    { "name": "IT", "value": 5 },
    { "name": "ECE", "value": 4 },
    { "name": "EEE", "value": 2 }
  ];

  // 3️⃣ Category-wise reports
  categoryData = [
    { "name": "ID Card", "value": 6 },
    { "name": "Laptop", "value": 3 },
    { "name": "Wallet", "value": 5 },
    { "name": "Books", "value": 4 },
    { "name": "Others", "value": 1 }
  ];
}
