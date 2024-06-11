import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private Common: CommonService, private Constants: ConstantsService) { }

  ShowCompleteEmployeeDetail(searchEmployeesRqst: any): Observable<any> {
    let url = this.Constants.urlShowCompleteEmployeeDetail;
    return this.Common.post(url, searchEmployeesRqst);
  }
}
