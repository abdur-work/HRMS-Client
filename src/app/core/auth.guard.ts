import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserContextService } from 'src/app/services/user-context.service';
import { SessionService } from '../services/session.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {
  hello:any=[]
  constructor(private router: Router, private userContextService: UserContextService, private sessionService: SessionService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRoles:any = this.userContextService.getUserRoles();
    const requiredRoles = route.data['requiredRoles'] as string[]; // Specify required roles in route data

    if (!userRoles || userRoles.length == 0) {
      let model: any = this.sessionService.getItem('currentUser');
      userRoles = model.roles;
    }

    // Check if the user has any of the required roles to access the route
    const hasAccess = requiredRoles.some(role => userRoles.includes(role));
    this.hello=userRoles
    if (hasAccess) {
      return true; // User has access
    }
    else {
      this.router.navigate(['/access-denied'], { queryParams: { returnUrl: state.url } });
    }

    var user = this.userContextService.user$.getValue();
    if (user != null) {
      // logged in so return true
      return true;
    }
    else {
      // not logged in so redirect to login page with the return url and return false
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }

    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  } canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canCheck(role : any){
    if(this.hello.includes(role)){
      return true
    }else {
      return false
    }
  }
}
