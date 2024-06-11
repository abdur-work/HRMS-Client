import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-systems',
  templateUrl: './attendance-systems.component.html',
  styleUrls: ['./attendance-systems.component.scss']
})
export class AttendanceSystemsComponent implements OnInit {
  tabNumber: number=1;
  constructor() { }

  ngOnInit(): void {
  }

}
