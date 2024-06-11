import { DatePipe } from '@angular/common';
import { Component, ComponentFactoryResolver, EventEmitter, Injector, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { AddAttendanceService } from '../../common/add-attendance/add-attendance.service';
import { UserContextService } from '../../services/user-context.service';
import { AnnouncementService } from '../announcement/announcement.service';
import { DashboardService } from './dashboard.service';
import { interval } from 'rxjs';
import { SingalRService } from 'src/app/services/singal-r.service';
import { RatingComponent } from 'src/app/common/rating/rating.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  countData: any = {};
  holidaysEvent: any = {};
  anouncements: any = [];
  teammembers: any = [];
  totalweeklyworkhours: number = 0;
  hoursPart: any;
  minutesPart: any;
  mondayworkhour: number = 0;
  tuesdayworkhour: number = 0;
  wednesdayworkhour: number = 0;
  thursdayworkhour: number = 0;
  fridayworkhour: number = 0;
  saturdayworkhour: number = 0;
  sundayworkhour: number = 0;
  chartOptions: any = {};
  showMore: boolean = false;
  profileResponse: any = {};
  totalleaves: number = 0;
  currentStatus: string = '';
  checkInTime: string = '';
  checkOutTime: string = '';
  employeeAttendanceID: number = 0;
  expectedEarnHour: string = '';
  employeeWeekAttendanceStatus: any[] = [];
  getCompanyAnnouncement: any = [];
  searchCompanyAnnouncement: any = {};
  config_pgShowAnnouncement = {
    id: 'pg_announcement',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  supervisorEmployees: any[] = [];
  teamMemberEmployees: any[] = [];
  teamMemberEmployeesJson: any;
  supervisorDesignation: string = '';
  teamMemberDesignation: string = '';
  isCorrectLocation: boolean = false;
  attendanceModel: any = {};
  officeLocation: any = {};
  attendanceRecord: any = {};
  isClickable: boolean = false;
  pendingTime: any = 0;
  checkIndatathis!: any;
  formattedTime: any = '';
  fromtime: any = '';
  showCheckin: boolean = false;
  showCheckout: boolean = false;
  showThanks: boolean = false;
  IsrelaxTime: boolean = false;
  endIsrelaxTime: boolean = false;
  hourFromWithBuffer: any;
  checkInStatus: boolean = false;
  teamId: any = '';
  underLocation: boolean = false;
  bufferTimeStart: boolean = false;
  bufferTimeEnd: boolean = false;
  extraTime: any;
  endTime: any;
  endExtraMinutes: any;
  EndpendingTime: any;
  currentDate: any;
  currentTime: any;
  employeeName: any;
  getAllEmployeeRating:any []=[];
  @ViewChild('postJobEditContainer', { read: ViewContainerRef }) dialogContainer?: ViewContainerRef;
  // Performing = [
  //   { 
  //     name: 'Irem Marica',
  //     role: 'Manager',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  //   {
  //     name: 'John Doe',
  //     role: 'Developer',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     role: 'Designer',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  //   {
  //     name: 'Alice Johnson',
  //     role: 'Product Manager',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  //   {
  //     name: 'Bob Williams',
  //     role: 'QA Engineer',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  //   {
  //     name: 'Eva Brown',
  //     role: 'Sales Representative',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  //   {
  //     name: 'Sam Wilson',
  //     role: 'Customer Support',
  //     imageSrc: '../../../../assets/images/Ellipse 2.png',
  //     star: '5',
  //   },
  // ];

  Leaves = [
    {
      name: 'Irem Marica',
      role: 'Manager',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
    {
      name: 'John Doe',
      role: 'Developer',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
    {
      name: 'Jane Smith',
      role: 'Designer',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
    {
      name: 'Alice Johnson',
      role: 'Product Manager',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
    {
      name: 'Bob Williams',
      role: 'QA Engineer',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
    {
      name: 'Eva Brown',
      role: 'Sales Representative',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
    {
      name: 'Sam Wilson',
      role: 'Customer Support',
      imageSrc: '../../../../assets/images/Ellipse 2.png',
      date: '09/04/2024',
    },
  ];
  manageEmployee = {
    animationEnabled: true,
    backgroundColor: '#fff',
    title: {
      // text: "Project Cost Breakdown"
    },
    data: [
      {
        type: 'doughnut',
        yValueFormatString: "#,###.##'%'",
        indexLabel: '{name}',
        dataPoints: [
          { y: 11, name: 'Leaves Remaining: ', color: '#E3C8FF' },
          { y: 0, name: 'Leaves Used: ', color: '#8E24FF' },
        ],
      },
    ],
  };
  constructor(
    public datepipe: DatePipe,
    private dashboardService: DashboardService,
    private addAttendanceService: AddAttendanceService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private announcementService: AnnouncementService,
    private datePipe: DatePipe,
    private SingalRService: SingalRService,
    private userContextService: UserContextService,
    private componentFactoryResolver: ComponentFactoryResolver
    , private injector: Injector
  ) {}

  ngOnInit() {
    this.callFunction();
    setInterval(() => {
      this.checkPuncinsPunchoutTime();
    }, 1000);
  }
  checkPuncinsPunchoutTime() {
    this.checkIndatathis= this.SingalRService.checkInFunction();
  }

  callFunction() {
    this.GetEmployeeDashboardData();
    this.GetEmployeeDashboardCountData();
    this.GetHolidaysEvents();
    this.GetAnouncementAndTeamMemberData();
    this.GetEmployeeWeeklyAttendanceData();
    this.updateCurrentDateTime();
    this.getEmployeesRating()
    setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);
  }

  getEmployeesRating(){
    this.spinnerService.show()
    this.dashboardService.GetEmployeeRating().subscribe((res)=>{
      if(res){
      this.spinnerService.hide()
        this.getAllEmployeeRating = res
        this.getAllEmployeeRating.sort((a, b) => b.ratingValue - a.ratingValue);
      }
    })
  }
  // createImgPath(employeePhoto: any, photoType: any) {
  //   if (photoType == 'uploadedurl')
  //     return environment.ApiUrl + '/' + employeePhoto;
  //   else
  //     return employeePhoto;
  // }

  GetEmployeeDashboardData() {
    let model = {
      employeeID: this.userContextService.user$._value.employeeId,
      companyId: this.userContextService.user$._value.companyID,
      team: this.userContextService.user$._value.teamId.toString(),
    };
    this.spinnerService.show();
    this.dashboardService.GetEmployeeDashboardData(model).subscribe((data) => {
      if (data.status) {
        this.spinnerService.hide();
        this.profileResponse = data.employeeProfileResponse;
        // this.bufferTime();
      }
      // this.userContextService.setUserTeamId(this.profileResponse.teamId);
    });
  }
  GetEmployeeDashboardCountData() {
    let model = {
      employeeID: this.userContextService.user$._value.employeeId,
      companyId: this.userContextService.user$._value.companyID,
      team: this.userContextService.user$._value.teamId.toString(),
    };
    this.spinnerService.show();
    this.dashboardService
      .GetEmployeeDashboardCountData(model)
      .subscribe((data) => {
        if (data.status) {
          this.spinnerService.hide();
          this.countData = data;
        }
      });
  }

  GetHolidaysEvents() {
    let model = {
      companyId: this.userContextService.user$._value.companyID,
      team: this.userContextService.user$._value.teamId.toString(),
    };
    this.spinnerService.show();
    this.dashboardService.GetHolidaysEvents(model).subscribe((data) => {
      if (data) {
        this.spinnerService.hide();
        this.holidaysEvent = data._result;
      }
    });
  }
  GetAnouncementAndTeamMemberData() {
    let model = {
      companyId: this.userContextService.user$._value.companyID,
      team: this.userContextService.user$._value.teamId.toString(),
    };
    this.spinnerService.show();
    this.dashboardService
      .GetAnouncementAndTeamMemberData(model)
      .subscribe((data) => {
        if (data) {
          this.spinnerService.hide();
          this.anouncements = data._result.anouncements;
          this.teammembers = data._result.teamMembers;
        }
      });
  }

  GetEmployeeWeeklyAttendanceData() {
    let model = {
      employeeID: this.userContextService.user$._value.employeeId,
      companyId: this.userContextService.user$._value.companyID,
      team: this.userContextService.user$._value.teamId.toString(),
    };
    this.spinnerService.show();
    this.dashboardService
      .urlGetEmployeeWeeklyAttendanceData(model)
      .subscribe((data) => {
        if (data) {
          this.spinnerService.hide();
          this.totalweeklyworkhours = this.convertMinutesToHours(
            data.totalWeeklyWorkDurationMinutes
          );
          this.hoursPart = Math.floor(this.totalweeklyworkhours);
          this.minutesPart = Math.round(
            (this.totalweeklyworkhours - this.hoursPart) * 60
          );
          this.mondayworkhour = data.weekDaysWorkDurationMinutes.Monday / 60;
          this.tuesdayworkhour = data.weekDaysWorkDurationMinutes.Tuesday / 60;
          this.wednesdayworkhour =
            data.weekDaysWorkDurationMinutes.Wednesday / 60;
          this.thursdayworkhour =
            data.weekDaysWorkDurationMinutes.Thursday / 60;
          this.fridayworkhour = data.weekDaysWorkDurationMinutes.Friday / 60;
          this.saturdayworkhour =
            data.weekDaysWorkDurationMinutes.Saturday / 60;
          this.sundayworkhour = data.weekDaysWorkDurationMinutes.Sunday / 60;
          this.chartOptions = {
            title: {
              // text: "Monthly Sales Data"
            },
            theme: 'light2',
            animationEnabled: true,
            exportEnabled: true,
            axisY: {
              includeZero: true,
              valueFormatString: '#,##Hr',
              maximum: 8,
            },
            data: [
              {
                type: 'column', //change type to bar, line, area, pie, etc
                yValueFormatString: '#,##Hr',
                color: '#8E24FF',
                dataPoints: [
                  { label: 'Mon', y: this.mondayworkhour },
                  { label: 'Tue', y: this.tuesdayworkhour },
                  { label: 'Wed', y: this.wednesdayworkhour },
                  { label: 'Thur', y: this.thursdayworkhour },
                  { label: 'Fri', y: this.fridayworkhour },
                ],
              },
            ],
          };
        }
      });
  }
  private convertMinutesToHours(minutes: number): number {
    return minutes / 60;
  }

  // new
  updateCurrentDateTime() {
    const now = new Date();
    this.currentDate = this.datepipe.transform(now, 'dd MMMM yyyy ');
    this.currentTime = this.datepipe.transform(now, 'h:mm:ss a');
  }

  bufferTime() {
    this.dashboardService
      .GetEmployeeBuffer(this.userContextService.user$._value.employeeId)
      .subscribe((res: any) => {
        if (res) {
          this.isClickable = res._result.isClickable;
          this.fromtime = res._result.fromtime;
          this.endTime = res._result.endtime;
          this.hourFromWithBuffer = res._result.hourFromWithBuffer;
          this.extraTime = res._result.timeBufferMinutes;
          this.endExtraMinutes = res._result.timeBufferAfterMinutes;
          this.pendingTime = this.timer(res._result.timerMinutes);
          this.EndpendingTime = this.timer(res._result.timeBufferAfterMinutes);
          const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          };
          const formatter = new Intl.DateTimeFormat('en-US', options);
          const currentTime = formatter.format(new Date());
          this.checkShiftTime(this.fromtime, currentTime, this.extraTime);
          this.checkShiftEndTime(
            this.endTime,
            currentTime,
            this.endExtraMinutes
          );
        }
      });
  }

  //
  checkShiftTime(
    shiftStart: string,
    currentTime: string,
    extraMinutes: number
  ): void {
    const currentDate = new Date();
    const shiftStartDate = new Date(
      `${currentDate.toDateString()} ${shiftStart}`
    );
    const currentDateAdjusted = new Date(shiftStartDate);
    const currentDateTime = new Date(
      `${currentDateAdjusted.toDateString()} ${currentTime}`
    );
    const shiftEndDateTime = new Date(
      shiftStartDate.getTime() + extraMinutes * 60000
    );
    if (
      currentDateTime >= shiftStartDate &&
      currentDateTime < shiftEndDateTime
    ) {
      this.underLocation = true;
      if (this.underLocation == true) {
        this.IsrelaxTime = true;
      }
    } else {
      this.underLocation = false;
    }
  }
  checkShiftEndTime(
    ShiftEnd: string,
    currentTime: string,
    extraMinutes: number
  ): void {
    const currentDate = new Date();
    const shiftStartDate = new Date(
      `${currentDate.toDateString()} ${ShiftEnd}`
    );
    const currentDateAdjusted = new Date(shiftStartDate);
    const currentDateTime = new Date(
      `${currentDateAdjusted.toDateString()} ${currentTime}`
    );
    const shiftEndDateTime = new Date(
      shiftStartDate.getTime() + extraMinutes * 60000
    );
    if (
      currentDateTime >= shiftStartDate &&
      currentDateTime < shiftEndDateTime
    ) {
      this.showCheckout = true;
      if (this.showCheckout == true) {
        this.endIsrelaxTime = true;
      }
    } else {
      this.underLocation = false;
    }
  }
  timer(minute: any) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      if (this.pendingTime != 0) {
        this.pendingTime = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
        localStorage.setItem('pendingTime', this.pendingTime);
      }

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);
      }
    }, 1000);
  }

  createImgPath(employeePhoto: any) {
    if (!employeePhoto) return 'assets/images/projz/avatar.png';
    if (employeePhoto == 'uploadedurl')
      return environment.ApiUrl + '/' + employeePhoto;
    else return employeePhoto;
  }

  checkInMessage(status: any = 'in') {
    this.spinnerService.show();
    if (status == 'out') {
      this.attendanceModel.checkedOut = this.getCurrentTime();
      this.attendanceModel.action = 'update';
      this.attendanceModel.employeeAttendanceID = this.employeeAttendanceID;
      this.attendanceModel.checkedIn = this.checkInTime;
      this.showThanks = true;
    } else {
      this.attendanceModel.action = 'save';
      this.attendanceModel.checkedIn = this.getCurrentTime();
    }
    this.attendanceModel.approvalStatus = 'Approved';
    this.attendanceModel.comment = 'Attendance added.';
    this.attendanceModel.attendanceStatus = 'Present';
    const selectedDate = new Date();
    this.attendanceModel.attendanceDate = selectedDate;
    this.attendanceModel.companyID =
      this.userContextService.user$._value.companyID;
    this.attendanceModel.employeeId =
      this.userContextService.user$._value.employeeId;
    this.addAttendanceService
      .AddAttendance(this.attendanceModel)
      .subscribe((data) => {
        if (data.status) {
          this.toastrService.success(
            'Attendance added successfully.',
            'Success'
          );
          this.getTodayEmployeeAttendance();
          this.showCheckin = false;
          this.showCheckout = true;
        }
        this.spinnerService.hide();
      });
  }

  getTodayEmployeeAttendance() {
    this.spinnerService.show();
    this.announcementService
      .GetTodayEmployeeAttendance(
        this.userContextService.user$._value.employeeId
      )
      .subscribe((data) => {
        if (data.status && data.attendanceRecord) {
          this.attendanceRecord = data.attendanceRecord;
          this.checkInTime = this.attendanceRecord.checkedIn;
          this.checkOutTime = this.attendanceRecord.checkedOut;
          this.employeeAttendanceID =
            this.attendanceRecord.employeeAttendanceID;
          this.setAttendanceRecord();
        } else {
          this.getOfficeInfoByEmployee();
        }
        this.spinnerService.hide();
      });
  }

  setAttendanceRecord() {
    let workType = this.profileResponse ? this.profileResponse.workType : '';
    this.isCorrectLocation = true;
    if (workType == 'onsite') {
      if (this.checkInTime && this.checkOutTime) {
        this.isCorrectLocation = false;
      } else {
        this.isCorrectLocation = true;
        this.getOfficeInfoByEmployee();
      }
    }
  }

  getOfficeInfoByEmployee() {
    this.spinnerService.show();
    this.announcementService
      .GetOfficeInfoByEmployee(this.userContextService.user$._value.employeeId)
      .subscribe((data) => {
        if (data.status) {
          this.officeLocation = data.officeLocation;
          this.checkEmployeeLocation();
        }
        this.spinnerService.hide();
      });
  }

  checkEmployeeLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLatitude = position.coords.latitude;
          const currentLongitude = position.coords.longitude;
          const officeLatitude = parseFloat(this.officeLocation.latitude);
          const officeLongitude = parseFloat(this.officeLocation.longitude);
          const boundaryRadius = parseFloat(this.officeLocation.meter);

          const distance = this.calculateDistance(
            currentLatitude,
            currentLongitude,
            officeLatitude,
            officeLongitude
          );

          const isWithinBoundary = distance <= boundaryRadius;
          if (isWithinBoundary) {
            console.log('User is within the specified boundary.');
            this.underLocation = true;
          } else {
            console.log('User is outside the specified boundary.');
            this.underLocation = false;
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000;
    return distance;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  getCurrentTime(): any {
    const currentTime = new Date();
    return this.datePipe.transform(currentTime, 'hh:mm a');
  }

  ratingPopup(){
    const factory = this.componentFactoryResolver.resolveComponentFactory(RatingComponent);
    const data: any =
    {
      // postJobId: postJobId
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.dialogContainer?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((rating: any) => {
      popupRef.destroy();
      if (rating) {
        // this.showAppliedApplication();
      }
    });
  }
}
