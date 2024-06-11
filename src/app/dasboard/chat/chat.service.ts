import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { UserContextService } from 'src/app/services/user-context.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

    getMyChats(signalRid: any): Observable<any> {
      let url = this.Constants.urlgetMyChats + '/' + signalRid;
      return this.Common.get(url);
    }

    GetMessages(chatId: any): Observable<any> {
      let url = this.Constants.urlGetMessages + '/' + chatId;
      return this.Common.get(url);
    }
}
