import { DatePipe } from '@angular/common';
import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddAttendanceComponent } from '../../../common/add-attendance/add-attendance.component';
import { ConfirmPopupComponent } from '../../../common/confirm-popup/confirm-popup.component';
import { UserContextService } from '../../../services/user-context.service';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  monthValue: number = 0;
  yearValue: number = 0;
  dayValue: number = 0;
  public weekDaysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public weeks: Array<Array<any>> = [];
  years: number[] = [];
  showCalendarView: any[] = [];
  showLeaveRequestCalendarView: any[] = [];
  employeeName: string = '';
  joiningDate: any = '';
  currentDay : number = 0;
  @ViewChild('attendanceContainer', { read: ViewContainerRef }) dialogContainer?: ViewContainerRef;
  @ViewChild('deletePopup', { read: ViewContainerRef }) deletePopup?: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector,
    private userContextService: UserContextService, private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService, private attendanceService: AttendanceService,
    private sanitizer: DomSanitizer, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.monthValue = new Date().getMonth()+1;
    this.yearValue = new Date().getFullYear();
    this.currentDay = new Date().getDate();
    this.getAttendanceCalendarView();
  }

  onChangeDateFilter(event: any, type: any) {
    var date: Date = new Date();
    const passNumber: number = Number(event.target.value);
    if (type == 'y') {
      date = new Date(passNumber, date.getMonth(), 1);
    }
    else {
      date = new Date(date.getFullYear(), passNumber - 1, 1);
    }
    this.getAttendanceCalendarView();
  }

  addAttendancePopup(day: any) {
    const userRoles: any = this.userContextService.getUserRoles();
    if (!userRoles.includes(132)) {
      this.toastrService.error('You have no rights to add attendance.');
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddAttendanceComponent);
    let model: any = this.showCalendarView.filter((event) => event.attendanceDateNum === day);
    const firstOrDefault = model.find(() => true);
    const data: any =
    {
      day: day,
      year: this.yearValue,
      month: this.monthValue,
      attendanceModel: firstOrDefault,
      leaveModel: null
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.dialogContainer?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((status: any) => {
      popupRef.destroy();
      if (status) {
        this.getAttendanceCalendarView();
      }
    });
  }

  getAttendanceCalendarView() {
    let model = {
      "employeeId": this.userContextService.user$._value.employeeId,
      "searchedMonth": this.monthValue,
      "searchedYear": this.yearValue
    };
    this.spinnerService.show();
    this.attendanceService.GetAttendanceCalendarView(model).subscribe(data => {
      if (data.status && data.showCalendarView) {
        this.showCalendarView = data.showCalendarView.calendarDay;
        this.employeeName = data.showCalendarView.employeeName;
        this.joiningDate = data.showCalendarView.joiningDate;
        const yearJoin: any= this.datePipe.transform(this.joiningDate, 'yyyy');
        // Loop through the range and add each year to the array
        for (let year = yearJoin; year <= 2050; year++) {
          this.years.push(year);
        }
        this.dayValue = new Date().getDate();
      }
      this.spinnerService.hide();
    });
  }

  checkAttendanceTime(day: any) {
    if (day && day.attendanceStatus == 'Present' && day.checkedIn && !day.checkedOut) {
      return day.checkedIn;
    }
    else if (day && day.attendanceStatus == 'Present' && day.checkedIn && day.checkedOut) {
      return day.checkedIn + '-' + day.checkedOut;
    }
    return '';
  }


  checkHalfDay(day: any) {
    if (day && day.attendanceStatus == 'half-day') {
      return 'Half Day (' + day.checkedIn + '-' + day.checkedOut + ')';
    }
    return '';
  }

  checkShortLeave(day: any) {
    if (day && day.attendanceStatus == 'short-leave') {
      return 'Short Leave (' + day.checkedIn + '-' + day.checkedOut + ')';
    }
    return '';
  }

  CheckDate(day: string): boolean {
    const selectedDate = new Date(2023, this.monthValue - 1, Number(day));
    if (this.currentDay == selectedDate.getDate()) {
      return true;
    }
    if (this.currentDay >= selectedDate.getDate()) {
      return true;
    }
    return false;
  }

  deleteAttendancePopup(day: number) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ConfirmPopupComponent);
    const data: any =
    {
      header: 'Delete',
      msg: 'Are you sure you want to delete?',
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.deletePopup?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((status: any) => {
      popupRef.destroy();
      if (status) {
        this.deleteAttendanceLeaveRecord(day);
      }
    });
  }

  deleteAttendanceLeaveRecord(day: number) {
    this.spinnerService.show();
    let leaveResult: any = this.showLeaveRequestCalendarView.find((event) =>
      event.leaveStartDateNum === day &&
      event.leaveStartYear == this.yearValue &&
      event.leaveStartMonth == this.monthValue
    );

    let attendanceResult: any = this.showCalendarView.find((event) =>
      event.attendanceDateNum === day &&
      event.attendanceYear == this.yearValue &&
      event.attendanceMonth == this.monthValue
    );

    let model = {
      id: attendanceResult ? attendanceResult.employeeAttendanceID : leaveResult.employeeLeaveRequestID,
      deleteParam: leaveResult ? 'leave' : 'attendance'
    }
    this.attendanceService.DeleteAttendanceLeaveRecord(model).subscribe(data => {
      if (data.status) {
        this.toastrService.success("Record has been deleted.");
        this.getAttendanceCalendarView();
      }
      this.spinnerService.hide();
    });
  }
}
