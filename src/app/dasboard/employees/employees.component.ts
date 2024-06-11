import {
  Component,
  ComponentFactoryResolver,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { UserContextService } from '../../services/user-context.service';
import { EmployeesService } from '../employees/employees.service';
import { EditEmployeeComponent } from '../../../app/common/edit-employee/edit-employee.component';
import { DeleteConfirmationComponent } from '../../../app/common/delete-confirmation/delete-confirmation.component';
import { AddSalaryService } from '../../common/add-salary/add-salary.service';
import { AddEmployeeService } from './components/add-employee/add-employee.service';
interface Column {
  title: string;
  text: string;
  backgroundColor: string;
  width?: string;
  active?: boolean;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  selected: boolean = false;
  searchEmployeesRqst: any = {};
  employeelist: any = ([] = []);
  SelectedPageSize: number = 10;
  userInfo: any = {};
  employeeNameList: any = [];
  filteredSuggestions: any = ([] = []);
  touchedSuggestedtext: boolean = false;
  config_pgEmployeeList = {
    id: 'pg_EmployeeList',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };
  @ViewChild('employeeEditContainer', { read: ViewContainerRef })
  dialogContainer?: ViewContainerRef;
  @ViewChild('employeeDeleteContainer', { read: ViewContainerRef })
  dialogContainerDelete?: ViewContainerRef;
  listLookup: any = {};
  isAddEmployeeAccess: boolean = false;
  isEmployeeEdit: boolean = false;
  isEmployeeDelete: boolean = false;
  users: any;
  currentUserTeamId: number | undefined;
  constructor(
    private employeeService: EmployeesService,
    private addSalaryService: AddSalaryService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private addEmployeeService: AddEmployeeService,
    private userContextService: UserContextService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.userContextService.teamId$.subscribe((data: any) => {
      if(data){
        this.currentUserTeamId = data;
      }
      else if(!data){
        this.currentUserTeamId = data;
      }
    });
    this.searchEmployeesRqst.location = '';
    this.searchEmployeesRqst.employmentType = '';
    this.searchEmployeesRqst.department = '';
    this.searchEmployeesRqst.position = '';
    this.searchEmployeesRqst.employeeName = '';
    this.searchEmployeesRqst.employmentStatus = '';
    const userRoles: any = this.userContextService.getUserRoles();
    this.isAddEmployeeAccess = userRoles.includes(109);
    this.isEmployeeEdit = userRoles.includes(110);
    this.isEmployeeDelete = userRoles.includes(111);
    this.users = this.userContextService.user$._value;
  }

  ngOnInit(): void {
    this.fillEmployeeDDLByCompany();
    this.GetSetupLookUpData();
    this.getEmployeeBasicDetailForCompany();
    this.listView();
    this.setActive(0);
    
  }

  getEmployeeBasicDetailForCompany() {
    let model = {
  companyID:this.userContextService.user$._value.companyID,
  team:this.userContextService.user$._value.teamId.toString(),
  employmentType: "",
  location: "",
  department: "",
  position: "",
  pageIndex: 0,
  pageSize: 10,
  employeeName: "",
  employmentStatus: ""
     
    };
    this.spinnerService.show();
    this.employeeService
      .getEmployeeBasicDetailForCompany(model)
      .subscribe((data) => {
        if (data.status) {
          this.employeelist = data.employeelist;
          this.config_pgEmployeeList.totalItems = data.totalRecords;
        }
        this.spinnerService.hide();
      });
  }

  createImgPath(employeePhoto: any, photoType: any) {
    if (!employeePhoto) return 'assets/images/projz/avatar.png';
    if (photoType == 'uploadedurl')
      return environment.ApiUrl + '/' + employeePhoto;
    else return employeePhoto;
  }

  editEmployee(employeeID: number) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      EditEmployeeComponent
    );
    const data: any = {
      employeeId: employeeID,
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.dialogContainer?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((editPostedJobs: any) => {
      popupRef.destroy();
      if (editPostedJobs) {
        this.getEmployeeBasicDetailForCompany();
      }
    });
  }

  deleteEmployee(employeeID: number, UserID: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      DeleteConfirmationComponent
    );
    const data: any = {
      Id: employeeID,
    };
    const popupInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });
    const popupRef = factory.create(popupInjector);
    this.dialogContainerDelete?.insert(popupRef.hostView);
    popupRef.instance.closed.subscribe((employeeID: any) => {
      popupRef.destroy();
      if (employeeID) {
        this.deleteUserById(UserID, employeeID);
      }
    });
  }

  deleteUserById(userID: any, employeeID: any) {
    this.spinnerService.show();
    this.employeeService.deleteUserById(userID).subscribe((data) => {
      if (data.status) {
        this.deleteCompanyById(employeeID);
      }
      this.spinnerService.hide();
    });
  }

  deleteCompanyById(employeeID: any) {
    this.spinnerService.show();
    this.employeeService.DeleteEmployeeDetail(employeeID).subscribe((data) => {
      if (data.status) {
        this.toastrService.success('Employee has been deleted.');
        this.getEmployeeBasicDetailForCompany();
      }
      this.spinnerService.hide();
    });
  }

  selectSuggestion(suggestion: any) {
    this.searchEmployeesRqst.employeeName = suggestion;
    this.touchedSuggestedtext = true;
    this.getEmployeeBasicDetailForCompany();
  }

  fillEmployeeDDLByCompany() {
    this.spinnerService.show();
    this.addSalaryService
      .fillEmployeeDDLByCompany(
        this.userContextService.user$._value.companyID,
        'employees'
      )
      .subscribe((data) => {
        if (data.status) {
          this.employeeNameList = data.employeeDDLlist;
          this.touchedSuggestedtext = false;
        }
        this.spinnerService.hide();
      });
  }

  filterSuggestions() {
    if (this.searchEmployeesRqst.employeeName) {
      const keyword = this.searchEmployeesRqst.employeeName.toLowerCase();
      this.filteredSuggestions = this.employeeNameList.filter(
        (suggestion: { employeeName: string }) =>
          suggestion.employeeName.toLowerCase().includes(keyword)
      );
    } else {
      this.filteredSuggestions = [];
    }
  }

  clearSearch() {
    this.searchEmployeesRqst.employeeName = '';
    this.touchedSuggestedtext = false;
    this.getEmployeeBasicDetailForCompany();
  }

  GetSetupLookUpData() {
    this.spinnerService.show();
    let model: any = {
      companyId: this.userContextService.user$._value.companyID,
      requiredDataList: ['office', 'department', 'team', 'position', 'et'],
    };
    this.addEmployeeService.GetSetupLookUpData(model).subscribe((data) => {
      if (data.status) {
        this.listLookup = data.lookUpList;
      }
      this.spinnerService.hide();
    });
  }

  OnChangeEmployeeStatus(empId: any, event: any,name:string) {
    this.employeeService.OnChangeEmployeeStatus(empId, event.target.checked) .subscribe((data) => {
      if(data){
        if(event.target.checked){
          console.log("call if ")
          this.toastrService.success(name,"Activated")
         }else{
          console.log("call else ")
          this.toastrService.error(name,"is Deactivated")
         }
      }
      
        this.spinnerService.hide();
        // if (data.status) {
        //   this.getEmployeeBasicDetailForCompany();
        // }
        // this.spinnerService.hide();
      });
  }
  // 

  columns: Column[] = [
    { title: 'Column 1', text: 'Some text..', backgroundColor: '#aaa' },
    { title: 'Column 2', text: 'Some text..', backgroundColor: '#bbb' }
  ];
  listView() {
    this.columns.forEach(column => {
      column.width = '100%';
    });
    this.setActive(0);
    this.getEmployeeBasicDetailForCompany();
  }
  setActive(index: number) {
    this.columns.forEach((column, i) => {
      column.active = i === index;
    });
  }
  gridView() {
    this.columns.forEach(column => {
      column.width = '50%';
      this.getEmployeeBasicDetailForCompany();
    });
    this.setActive(1);
    
  }
  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }
}
