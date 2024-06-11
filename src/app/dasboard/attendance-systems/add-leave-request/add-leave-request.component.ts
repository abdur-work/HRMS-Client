import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserContextService } from '../../../services/user-context.service';
import { AddLeaveRequestService } from './add-leave-request.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-add-leave-request',
  templateUrl: './add-leave-request.component.html',
  styleUrls: ['./add-leave-request.component.scss']
})
export class AddLeaveRequestComponent implements OnInit {
  tabNumber: number = 2;
  employeeLeaveModel: any = {};
  attendanceModel: any = {};
  leaveType: string = 'full-day';
  totalleaves: number = 0;
  consumedleaves: number = 0;
  remainingleaves: number = 0;
  maxChars = 400;
  constructor(private spinnerService: NgxSpinnerService, private toastrService: ToastrService,
    private addLeaveRequestService: AddLeaveRequestService, private currentRoute: Router,
    private userContextService: UserContextService,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.GetEmployeeDashboardData()
  }

  tabChangeEvent(tabNum: number) {
    this.tabNumber = tabNum;
  }

  addLeaveRequest() {
    if (this.validateLeaveForm()) {
      this.spinnerService.show();
      this.setLeaveRequestWhileSaving();
      this.employeeLeaveModel.companyID = this.userContextService.user$._value.companyID;
      this.employeeLeaveModel.employeeId = this.userContextService.user$._value.employeeId;
      this.addLeaveRequestService.AddLeaveRequest(this.employeeLeaveModel).subscribe(data => {
        if (data.status) {
          this.toastrService.success("Leave request has been added successfully.", 'Success');
        }
        this.spinnerService.hide();
      });
    }
  }

  validateLeaveForm() {
    if (!this.employeeLeaveModel.leaveDuration) {
      this.toastrService.error('Select leave duration.');
      return false;
    }
    else if (!this.employeeLeaveModel.leaveType) {
      this.toastrService.error('Select leave type.');
      return false;
    }
    else if (this.employeeLeaveModel.leaveDuration == 'full-day' && this.employeeLeaveModel.leaveStartDate > this.employeeLeaveModel.leaveEndDate) {
      this.toastrService.error('Start date cannot be greater than end date');
      return false;
    }
    else if (['half-day', 'short-leave'].includes(this.employeeLeaveModel.leaveDuration) && !this.employeeLeaveModel.leaveTimeFrom
      && !this.employeeLeaveModel.leaveTimeFrom) {
      this.toastrService.error('Enter a time from.');
      return false;
    }
    else if (['half-day', 'short-leave'].includes(this.employeeLeaveModel.leaveDuration) && !this.employeeLeaveModel.leaveTimeFrom
      && !this.employeeLeaveModel.leaveTimeTo) {
      this.toastrService.error('Enter a time to.');
      return false;
    }
    else if (['half-day', 'short-leave'].includes(this.employeeLeaveModel.leaveDuration) && !this.employeeLeaveModel.leaveTimeFrom
      && !this.validateTime(this.employeeLeaveModel.leaveTimeFrom)) {
      this.toastrService.error('Please enter the time in the correct format: 02:00 PM.');
      return false;
    }
    else if (['half-day', 'short-leave'].includes(this.employeeLeaveModel.leaveDuration) && !this.employeeLeaveModel.leaveTimeFrom
      && !this.validateTime(this.employeeLeaveModel.leaveTimeTo)) {
      this.toastrService.error('Please enter the time in the correct format: 06:00 PM.');
      return false;
    }
    return true;
  }

  setLeaveRequestWhileSaving() {
    this.employeeLeaveModel.leaveStartDate = new Date(Date.parse(this.employeeLeaveModel.leaveStartDate));
    this.employeeLeaveModel.leaveEndDate = new Date(Date.parse(this.employeeLeaveModel.leaveEndDate));
    if (this.employeeLeaveModel.leaveDuration == 'full-day') {
      this.employeeLeaveModel.leaveTimeFrom = '';
      this.employeeLeaveModel.leaveTimeTo = '';
    }
    else {
      this.employeeLeaveModel.leaveEndDate = null;
      this.employeeLeaveModel.leaveStartDate = new Date();
    }
  }

  validateTime(time: any) {
    const pattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] [AP]M$/; // pattern for valid time input
    const isValid = pattern.test(time); // check if input matches pattern
    if (!isValid) {
      return false;
    }
    return true;
  }

  addAttendance() {
    if (this.validateForm()) {
      this.spinnerService.show();
      this.attendanceModel.companyID = this.userContextService.user$._value.companyID;
      this.attendanceModel.employeeId = this.userContextService.user$._value.employeeId;
      this.attendanceModel.attendanceDate = new Date(Date.parse(this.attendanceModel.attendanceDate));
      this.addLeaveRequestService.AddAttendance(this.attendanceModel).subscribe(data => {
        if (data.status) {
          this.toastrService.success("Attendance has been added successfully.", 'Success');
        }
        this.spinnerService.hide();
      });
    }
  }

  validateForm() {
    if (!this.attendanceModel.attendanceDate) {
      this.toastrService.error('Date is not filled.');
      return false;
    }
    else if (!this.attendanceModel.checkedIn) {
      this.toastrService.error('Enter Checked In time.');
      return false;
    }
    else if (this.attendanceModel.checkedIn && !this.validateTime(this.attendanceModel.checkedIn)) {
      this.toastrService.error('Please enter the time in the correct format: 09:00 AM.');
      return false;
    }
    else if (this.attendanceModel.checkedOut && !this.validateTime(this.attendanceModel.checkedOut)) {
      this.toastrService.error('Please enter the time in the correct format: 04:00 AM.');
      return false;
    }
    return true;
  }

  gobackToAttendace() {
    this.currentRoute.navigate(['/dashboard/attendance-system'])
  }
  GetEmployeeDashboardData() {
    let model = {
      employeeID: this.userContextService.user$._value.employeeId,
      companyId: this.userContextService.user$._value.companyID,
    };
    this.spinnerService.show();
    this.dashboardService.GetEmployeeDashboardData(model).subscribe((data) => {
      this.spinnerService.hide();
      if (data.status) {
        this.totalleaves = data.totalleaves;
        this.remainingleaves = data.remainingleaves;
        this.consumedleaves = data.consumedleaves;
      }
    });
  }
}
