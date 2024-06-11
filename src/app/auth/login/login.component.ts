import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ConstantsService } from '../../services/constants.service';
import { UserContextService } from '../../services/user-context.service';
import { RouteStateService } from '../../services/route-state.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin: any = {};
  private hubConnection: signalR.HubConnection;
  constructor(private commonService: CommonService,
    private constantsService: ConstantsService, private userContextService: UserContextService
    , private routeStateService: RouteStateService, private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService) { 
      this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http:///192.52.242.226/api/chatHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    }
    async ngOnInit(): Promise<void> {
      this.userLogin.email = '';
      this.userLogin.password = '';
      // Call the API service function when the app component initializes
  
      try {
        await this.startSignalRConnection()
      }
      catch (error) {
        console.error('Error starting SignalR connection:', error);
        // Handle connection startup errors here
      }
    }
    async startSignalRConnection(): Promise<void> {

      if (this.hubConnection.state === 'Disconnected') {
        await this.hubConnection
          .start()
          .then(() => {
            console.log('SignalR connection started successfully.');
            // Implement any logic you need after a successful connection
          })
          .catch((error) => {
            console.error('Error starting SignalR connection:', error);
            throw error; // Propagate the error
          });
      } else {
        console.warn('SignalR connection is already in a connected or connecting state.');
      }
    }

  // ngOnInit(): void {
  //   // this.userLogin.email = '';
  //   // this.userLogin.password = '';
  // }

  Login() {
    let userModel = {
      Email: this.userLogin.email,
      Password: this.userLogin.password,
      Role:'Employee'
    }
    this.spinnerService.show();
    let url = this.constantsService.urlLogin;
    this.commonService.post(url, userModel).subscribe(data => {
      this.spinnerService.hide();
      let userData: any = data;
      if (userData && userData.status) {
        userData.user.token=userData.token
        userData.user.teamId=userData.teamId
        userData.user.userRole = userData.userRole;
        userData.user.companyID = userData.companyID ? userData.companyID : 0;
        userData.user.companyName = userData.companyName ? userData.companyName : '';
        userData.user.employeeId = userData.employeeId ? userData.employeeId : '';
        userData.user.employeeName = userData.employeeName ? userData.employeeName : '';
         userData.user.signalRId = userData.signalRId ? userData.signalRId : '';
        userData.user.roles = userData.roles && userData.roles.length > 0 ? userData.roles : [];
        this.userContextService.setUser(userData.user);
        this.userContextService.setUserRoles(userData.roles);
        this.routeStateService.add("Dashboard", '/dashboard', null, true);
        return;
      }
      this.toastrService.error(userData.message, 'Not Authenticated');
      return;
    });
  }

  goToRegister() {
    this.routeStateService.add("signup", '/auth/signup', null, true);
  }
}
