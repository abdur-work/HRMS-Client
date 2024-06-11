import { Component } from '@angular/core';
import { UserContextService } from './services/user-context.service';
import { searchItems } from './services/search';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionService } from './services/session.service';
import { RouteStateService } from './services/route-state.service';
import { SingalRService } from './services/singal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HrmsAdminFrontend';
  typeSelected: string = 'ball-fussion';
  users: any = {};
  isLogedIn: boolean = false;
  searchItems = searchItems
  authenticated:boolean = true
  registerCompany:boolean=true
  logIn:boolean=true
  companyLogo: string = '';
  employeeName: string = '';
  searchData:any
  filteredSuggestions: { route: string, items: string[] }[] = [];

  constructor(private userContextService: UserContextService,
     private router: Router,
     private sessionService: SessionService,
     private routeStateService: RouteStateService,
     private signalRService: SingalRService) {
    this.users = this.userContextService.user$._value;
    this.userContextService.user$.subscribe((data: any) => {
      if (!data) {
        this.isLogedIn = false;
      } else {
        this.isLogedIn = true;
        this.employeeName = this.userContextService.user$._value.employeeName;
      }
    })
  }
  onSearching(event: any): void {
    const query = event.target.value;
    if (query.length > 0) {
      this.filteredSuggestions = this.searchItems.filter(item =>
        item.items.some(item => item.toLowerCase().includes(query.toLowerCase()))
      );
    } else {
      this.filteredSuggestions = [];
    }
  }
  closeSuggestions(): void {
    // Use setTimeout to allow click events to occur before closing suggestions
    setTimeout(() => {
      this.filteredSuggestions = [];
    }, 200);
  }
  selectSuggestion(route: string): void {
    console.log(route);
    // this.router.navigate([`${route}`]);
    this.router.navigate([route]);
    this.searchData=''
  }
  isActive(value: string) {
    if (window.location.href.split('/').includes(value)) {
      return true
   
    } else {
      return false
    }
  }
  createImgPath() {
    if (this.companyLogo)
      return environment.ApiUrl + '/' + this.companyLogo;
    return 'assets/images/projz/avatar.png';
  }
  // logout() {
  //   // this.signalRService.logOut()
  //   // this.routeStateService.removeAll();
  //   // this.userContextService.logout();
  //   // this.sessionService.removeItem('active-menu');
  //   // this.router.navigate(['/auth/login']);
  //   // this.signalRService.logOut()
  //   // localStorage.removeItem('SinalRuserId');
  //   // this.routeStateService.removeAll();
  //   // this.userContextService.logout();
  //   // this.sessionService.removeItem('active-menu');
  //   // this.router.navigate(['']);
  // }
  logout() {
    this.signalRService.logOut()
    localStorage.removeItem('SinalRuserId');
    this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['']);
  }
}
