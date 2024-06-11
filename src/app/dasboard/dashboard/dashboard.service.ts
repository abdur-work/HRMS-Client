import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  GetEmployeeDashboardData(model: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeDashboardData;
    return this.Common.post(url, model);
  }
  GetEmployeeDashboardCountData(model: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeDashboardCountData;
    return this.Common.post(url, model);
  }

  GetHolidaysEvents(model: any): Observable<any> {
    let url = this.Constants.urlGetHolidaysEvents;
    return this.Common.post(url, model);
  }

  GetAnouncementAndTeamMemberData(model: any): Observable<any> {
    let url = this.Constants.urlGetAnouncementandTeamMemberData;
    return this.Common.post(url, model);
  }

  urlGetEmployeeWeeklyAttendanceData(model: any): Observable<any> {
    let url = this.Constants.urlGetEmployeeWeeklyAttendanceData;
    return this.Common.post(url, model);
  }


  GetEmployeeBuffer(employeeID: any){
    let url = this.Constants.urlEmployeeBufferTime + "/" + employeeID;
    return this.Common.post(url, employeeID)
  }
  GetEmployeeRating(): Observable<any> {
    let url = this.Constants.urlGetEmployeeRating;
    return this.Common.get(url);
  }
}
