import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserContextService } from '../../services/user-context.service';
import { ProfilesService } from '../../dasboard/profiles/profiles.service';
import { environment } from '../../../environments/environment';
import { AuthGuard } from 'src/app/core/auth.guard';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  tabNumber: number = 1;
  employeeRegisterRqst: any = {};

  constructor(private userContextService: UserContextService, private spinnerService: NgxSpinnerService,
    private profilesService: ProfilesService,private checkRole: AuthGuard) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    let model = {
      "employeeID": this.userContextService.user$._value.employeeId
    };
    this.spinnerService.show();
    this.profilesService.ShowCompleteEmployeeDetail(model).subscribe(data => {
      if (data.status) {
        this.employeeRegisterRqst = data.employeeDetail;
        console.log("this.employeeRegisterRqst",this.employeeRegisterRqst)
      }
      this.spinnerService.hide();
    });
  }

  // createImgPath(employeePhoto: any, photoType: string) {
  //   if (photoType == 'uploadedurl')
  //     return environment.ApiUrl + '/' + employeePhoto;
  //   else
  //     return employeePhoto;
  // }

  createImgPath(employeePhoto: any, photoType: any) {
    if (!employeePhoto)
      return 'assets/images/projz/avatar.png';
    if (photoType == null)
      return environment.ApiUrl + '/' + employeePhoto;
    else
      return employeePhoto;
  }
  canCheck(roles:any){
    return this.checkRole.canCheck(roles)
   }
}
