import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeLeaveComponent } from '../employee-leave.component';
import { LeaveSystemComponent } from '../../../leave-system.component';
import { LeaveSystemService } from '../../../leave-system.service';
@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailsComponent {
  @Input() data: any;
  @Output() closed = new EventEmitter();

  constructor(private spinnerService: NgxSpinnerService, private employeeLeaveService: LeaveSystemService) {

  }
  ClosePopup() {
    this.closed.emit(true);
  }


  updateEmployeeLeaveStatus(status = '', emp: any = {}) {
    let model = {
      "status": status,
      "employeeLeaveRequestId": emp.employeeLeaveRequestID
    };
    this.spinnerService.show();
    this.employeeLeaveService.updateEmployeeLeaveStatus(model).subscribe(data => {
      if (data.status) {
        this.ClosePopup();
      }
      this.spinnerService.hide();
    });
  }
}
