import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';
import { HttpClient } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class AddAnnouncementService {

  constructor(private http: HttpClient,private Common: CommonService, private Constants: ConstantsService, private userContextService: UserContextService ) { }

  SaveCompanyAnnouncement(announcementModel: any): Observable<any> {
    let url = this.Constants.urlSaveTeamAnnouncment;
    return this.Common.post(url, announcementModel);
  }
}
