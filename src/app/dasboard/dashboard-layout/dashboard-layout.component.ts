import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from '../../../app/services/route-state.service'
import { SessionService } from '../../services/session.service';
import { UserContextService } from '../../services/user-context.service';

@Component({
  selector: 'll-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isLessThenLargeDevice;
  public collapsed = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userContextService: UserContextService  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });

  }

  logout() {
    this.routeStateService.removeAll();
    this.userContextService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['']);
  }
}
