import { Component,Output,Input,EventEmitter,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserContextService } from 'src/app/services/user-context.service';
import { LeaveSystemService } from './leave-system.service';
import { RouteStateService } from 'src/app/services/route-state.service';
import { Methods } from '../../services/constants.service';
import { ComponentFactoryResolver } from '@angular/core';
import { Injector } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { LeaveDetailsComponent } from './components/employee-leave/leave-detail/leave-detail.component';

@Component({
  selector: 'app-leave-system',
  templateUrl: './leave-system.component.html',
  styleUrls: ['./leave-system.component.scss']
})
export class LeaveSystemComponent {
  @Input() data: any;
  @Output() closed = new EventEmitter();
  newDate:any
  searchEmployeesRqst: any = {};
  employeelist: any = [];
  config_pgEmployeeList = {
    id: "pg_EmployeeList",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  canAccessLeaveRequest: boolean = false;
  currentUserTeamId: any;
  @ViewChild('leaveHistoryContainer', { read: ViewContainerRef }) dialogContainer?: ViewContainerRef;

  constructor( private injector: Injector, private _componentFactoryResolver: ComponentFactoryResolver,private userContextService: UserContextService,private spinnerService: NgxSpinnerService,private leaveSystemServices:LeaveSystemService
    , private routeStateService: RouteStateService,){
      this.setSearchDate()
    this.searchEmployeesRqst.location = '';
    this.searchEmployeesRqst.employmentType = '';
    this.searchEmployeesRqst.department = '';
    this.searchEmployeesRqst.position = '';
    this.searchEmployeesRqst.employeeName = '';
    this.searchEmployeesRqst.filterStatus = 'all';
    const userRoles: any = this.userContextService.getUserRoles();
    if (userRoles.includes(1291) || userRoles.includes(1292)) {
      this.canAccessLeaveRequest = true;
    }
    this.filterChange();

  }
  getEmployeeLeaveRequest() {
    const currentDate = new Date();

    let model = {
      companyId: this.userContextService.user$._value.companyID,
      location: "",
      fullName: "",
      employmentType: "",
      department: "",
      position: "",
      team: this.userContextService.user$._value.teamId.toString(),
      filterStatus: "",
      searchDate: this.newDate,
      pageIndex: 0,
      pageSize: 10
    };
    this.spinnerService.show();
    this.leaveSystemServices.getEmployeeLeaveRequest(model).subscribe(data => {
      if (data.status) {
        this.employeelist = data.employeelist;
        this.config_pgEmployeeList.totalItems = data.totalRecords;
      }
      this.spinnerService.hide();
    });
  }
  setSearchDate() {
    const desiredDate = new Date();
    this.newDate= desiredDate.toISOString();
  }
  filterChange(param: any = 'all') {
    this.searchEmployeesRqst.filterStatus = param;
    this.getEmployeeLeaveRequest();
  }

  navigationToEmployeeAttendence(emp: any) {
    let model = {
      employeeId: emp.employeeId,
      employeeName: emp.employeeName
    }
    let modelString = JSON.stringify(model);
    let encodedModel = Methods.EncryptTo64(modelString);
    this.routeStateService.add("attendence", '/dashboard/attendance-system/' + encodedModel, encodedModel, true);
  }

  updateEmployeeLeaveStatus(status = '', emp: any = {}) {
    let model = {
      "status": status,
      "employeeLeaveRequestId": emp.employeeLeaveRequestId
    };
    this.spinnerService.show();
    this.leaveSystemServices.updateEmployeeLeaveStatus(model).subscribe(data => {
      if (data.status) {
        this.getEmployeeLeaveRequest();
      }
      this.spinnerService.hide();
    });
  }

  viewHierarchybyList(emp: any) {
    const factory = this._componentFactoryResolver.resolveComponentFactory(LeaveDetailsComponent);
    const data: any = {
      employee: emp,
      companyId: this.userContextService.user$._value.companyID,
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    popupRef.instance.closed.subscribe((id: any) => {
      popupRef.destroy();
      this.getEmployeeLeaveRequest();
    });
    popupRef.instance.data = data; // Set the data property
    this.dialogContainer?.insert(popupRef.hostView);
  }
}
