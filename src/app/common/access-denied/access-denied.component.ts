import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from '../../services/route-state.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent {
  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService) {
  }

  logout() {
    this.routeStateService.removeAll();
    this.sessionService.removeItem('currentUser');
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['']);
  }
}
