import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private userContext : UserContextService,private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  // getEmployeeBasicDetailForCompany(searchEmployeesRqst: any): Observable<any> {
  //   let url = this.Constants.urlGetEmployeeByTeamId;
  //   return this.Common.post(url, searchEmployeesRqst);
  // }

  getEmployeeBasicDetailForCompany(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeByTeamId;
    const token = this.userContextService.user$._value.token; 
    return this.Common.postWithHeader(url, searchEmployeesRqst, token);
  }

  deleteUserById(userID: any): Observable<any> {
    let url = this.Constants.urlDeleteUserInfo + '/' + userID;
    return this.Common.get(url);
  }

  DeleteEmployeeDetail(employeeID: any): Observable<any> {
    let url = this.Constants.urlDeleteEmployeeDetail + '/' + employeeID;
    return this.Common.get(url);
  }

  OnChangeEmployeeStatus(employeeID: any, isActivated: boolean): Observable<any> {
    let url = this.Constants.urlOnChangeEmployeeStatus + '/' + employeeID + "/" + isActivated;
    return this.Common.get(url);
  }
}
