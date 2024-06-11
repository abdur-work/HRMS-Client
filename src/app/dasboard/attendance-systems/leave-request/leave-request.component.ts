import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserContextService } from '../../../services/user-context.service';
import { AttendanceService } from '../attendance/attendance.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  showLeaveRequestCalendarView: any[] = [];
  isAccessAddLeave: boolean = false;

  constructor(private userContextService: UserContextService, private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService, private attendanceService: AttendanceService) {
    const userRoles: any = this.userContextService.getUserRoles();
    this.isAccessAddLeave = userRoles.includes(127);
  }

  ngOnInit(): void {
    this.getEmployeeLeaveCalendarView();
  }

  getEmployeeLeaveCalendarView() {
    let model = {
      "employeeId": this.userContextService.user$._value.employeeId
    };
    this.spinnerService.show();
    this.attendanceService.GetEmployeeLeaveCalendarView(model).subscribe(data => {
      if (data.status) {
        this.showLeaveRequestCalendarView = data.showLeaveCalendarView;
      }
      this.spinnerService.hide();
    });
  }
}
