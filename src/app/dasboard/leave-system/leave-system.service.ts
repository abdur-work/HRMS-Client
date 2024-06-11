import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserContextService } from 'src/app/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveSystemService {

  constructor(private userContext: UserContextService,private Common: CommonService, private Constants: ConstantsService) { }
  
  // getEmployeeLeaveRequest(searchEmployeesRqst: any): Observable<any> {
  //   let url = this.Constants.urlGetEmployeeLeavebyTeamId;
  //   return this.Common.post(url, searchEmployeesRqst);
  // }
  getEmployeeLeaveRequest(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeLeaveRequest;
    const token = this.userContext.user$._value.token; 
    return this.Common.postWithHeader(url, searchEmployeesRqst,token);
  }
  getEmployeeAttendanceRecord(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeAttendanceRecord;

    const token = this.userContext.user$._value.token; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.Common.post(url, searchEmployeesRqst);
  }

  getEmployeeAttendanceRecordByEmployeeId(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeAttendanceRecordByEmployeeId;
    return this.Common.post(url, searchEmployeesRqst);
  }

  getEmployeeLeaveRecordByEmployeeId(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeLeaveRecordByEmployeeId;
    return this.Common.post(url, searchEmployeesRqst);
  }
  updateEmployeeLeaveStatus(updateEmployeeLeaveStatusRqst: any): Observable<any> {
    let url = this.Constants.urlupdateEmployeeLeaveStatus;
    return this.Common.post(url, updateEmployeeLeaveStatusRqst);
  }
}
