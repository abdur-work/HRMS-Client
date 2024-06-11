import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
  constructor(private Common: CommonService, private Constants: ConstantsService,
    private userContextService: UserContextService) { }

  CalculateAverageRating(model: any): Observable<any> {
    let url = this.Constants.urlCalculateAverageRating;
    return this.Common.post(url, model);
  }
}
