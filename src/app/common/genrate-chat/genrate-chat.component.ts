import { Component, EventEmitter, Inject, Injector, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatService } from 'src/app/dasboard/chat/chat.service';
import { GenrateChatService } from './genrate-chat.service';
import { UserContextService } from 'src/app/services/user-context.service';
import { SingalRService } from '../../services/singal-r.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-genrate-chat',
  templateUrl: './genrate-chat.component.html',
  styleUrls: ['./genrate-chat.component.scss']
})
export class GenrateChatComponent {
  @Output() closed = new EventEmitter();
  searchEmployeesRqst: any = {};
  employeeList:any;
  companyList:any
  MessageBody:any
  employeeLists:any=[]
  // companyLists:any=[]
  id:any
  company:any
  ReceptType: any
  config_pgEmployeeList = {
    id: "pg_EmployeeList",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor( @Inject('data') public data: any, private injector: Injector,private spinnerService: NgxSpinnerService,private employeeChatService: GenrateChatService,private SingalRService:SingalRService,
  private userContextService: UserContextService,private sessionService: SessionService
){
  let companyid= this.sessionService.getItem("currentUser");
  let companyName= this.sessionService.getItem("currentUser");
  this.id= companyid.companyID
  this.company= companyName.companyName
  console.log("this.id",this.id)
  this.employeeList=0
  this.companyList=0
  this.searchEmployeesRqst.location = '';
    this.searchEmployeesRqst.employmentType = '';
    this.searchEmployeesRqst.department = '';
    this.searchEmployeesRqst.position = '';
    this.searchEmployeesRqst.employeeName = '';
    this.searchEmployeesRqst.employmentStatus = '';
}

ngOnInit():void{
  this.getEmployeeBasicDetailForChat()
  }

  sendMessage() {
    this.spinnerService.show();
    if(this.employeeList !=0){
      debugger
    this.SingalRService.sendPrivateMessage(this.employeeList,this.MessageBody,"2");
    }else if(this.companyList !=0){
      this.SingalRService.sendPrivateMessage(this.companyList,this.MessageBody,"1");
    }
    this.closed.emit(true);
      this.spinnerService.hide();
      
}
getEmployeeBasicDetailForChat() {
  let model = {
    "companyID": this.userContextService.user$._value.companyID,
    "location": this.searchEmployeesRqst.location,
    "employmentType": this.searchEmployeesRqst.employmentType,
    "department": this.searchEmployeesRqst.department,
    "position": this.searchEmployeesRqst.position,
    "employeeName": this.searchEmployeesRqst.employeeName,
    "employmentStatus": this.searchEmployeesRqst.employmentStatus,
    "pageIndex": this.config_pgEmployeeList.currentPage - 1,
    "pageSize": this.config_pgEmployeeList.itemsPerPage,
  };
  this.spinnerService.show();
  this.employeeChatService.getEmployeeBasicDetailForChat(model).subscribe(data => {
    console.log(data)
    if (data.status) {
      this.employeeLists = data.employeelist;
      console.log("emp",this.employeeLists)
      this.config_pgEmployeeList.totalItems = data.totalRecords;
    }
    this.spinnerService.hide();
  });
}


saveEmployeeSalary(){
  console.log("ans",this.employeeList)
}
closeSalaryForm() {
  this.closed.emit(false);
}
}
