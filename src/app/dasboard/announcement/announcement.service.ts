import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private Common: CommonService, private Constants: ConstantsService) { }

  GetCompanyAnnouncementList(model: any): Observable<any> {
    let url = this.Constants.urlGetCompanyAnnouncementList;
    return this.Common.post(url, model);
  }
  GetTeamAnnouncementList(model: any): Observable<any> {
    let url = this.Constants.urlGetTeamAnnouncementList;
    return this.Common.post(url, model);
  }

  GetOfficeInfoByEmployee(id: any): Observable<any> {
    let url = this.Constants.urlGetOfficeInfoByEmployee.concat("/", id);
    return this.Common.get(url);
  }

  GetTodayEmployeeAttendance(id: any): Observable<any> {
    let url = this.Constants.urlGetTodayEmployeeAttendance.concat("/", id);
    return this.Common.get(url);
  }
  DeleteCompanyAnnouncement(id: any): Observable<any> {
    let url = this.Constants.urlDeleteCompanyDetail + "/" + id;
    return this.Common.get(url);
  }
}
