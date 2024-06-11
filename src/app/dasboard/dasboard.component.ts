import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { RouteStateService } from '../services/route-state.service';
import { SessionService } from '../services/session.service';
import { UserContextService } from '../services/user-context.service';
import * as signalR from '@microsoft/signalr';
import { SingalRService } from '../services/singal-r.service';
import { AuthGuard } from '../core/auth.guard';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent {
  private hubConnection: signalR.HubConnection;
  companyId: string = '';
  employeeId: string = '';

  public collapsed = false;
  employeeName: string = '';
  companyLogo: string ='';
  constructor(
    private checkRole: AuthGuard,
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userContextService: UserContextService,
    private signalRService: SingalRService) {
     //SignalR
     this.hubConnection = new signalR.HubConnectionBuilder()
     .withUrl('http:///192.52.242.226/api/chatHub', {
       skipNegotiation: true,
       transport: signalR.HttpTransportType.WebSockets
     })
     .build();


   // this.router.events.subscribe((event: Event) => {
   //   if (event instanceof NavigationStart) {
   //     this.splitVal = event.url.split('/');
   //   }
   // });
   this.employeeName = this.userContextService.user$._value.employeeName;
   this.companyLogo = this.userContextService.user$._value.companyLogo;
   this.companyId = this.userContextService.user$._value.companyID;
   this.employeeId = this.userContextService.user$._value.employeeId;

 
  }
  storeIdInLocalStorage(id: string): void {
    localStorage.setItem('SinalRuserId', id.toString());
    localStorage.removeItem('userId');
    console.log('SinalRuserId:' + id.toString())
  }
  async ngOnInit(): Promise<void> {
    // Call the API service function when the app component initializes

    try {
      await this.startSignalRConnection();
      this.signalRService.openNewPage(this.employeeId.toString(), this.employeeName.toString());
      console.log("openNewPage is called");
    } catch (error) {
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
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.signalRService.leavePage(this.employeeId.toString(), this.employeeName.toString());
    console.log("page is closed");
  }

  logout() {
    this.signalRService.logOut()
    localStorage.removeItem('SinalRuserId');
    this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['']);
  }

  createImgPath() {
    if (this.companyLogo)
      return environment.ApiUrl + '/' + this.companyLogo;
    return '';
  }

  isActive(value: string) {
    if (window.location.href.split('/').includes(value)) {
      return true
    } else {
      return false
    }
  }
  canCheck(roles:any){
   return this.checkRole.canCheck(roles)
  }
}
