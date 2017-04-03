import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

/**
 *
 * This guard checks if the current user is logged in 
 * and restricts access to certain routes 
 */
@Injectable()
export class AuthGuard implements CanActivate {
  
  /*
   * Config
   */
  defaultRoute = '/workspaces';
  loginRoute   = '/login';
  
  
  /**
   *
   * Constructor
   */
  constructor(private _af: AngularFire, private router:Router) {}
  
  
  /**
   *
   * canActivate Router function
   * Essentially checks the current route and if the user has all permissions necessary to visit it
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    // DEV ONLY
    console.info('AuthGuard: active on ' + state.url);
    
    return this._af.auth.map((auth) => {
    
      let isLoggedIn = (auth == null ? false : true);
          
      // Grabs the current location and checks if certain criteria is met
      switch (state.url) {
        
        // If there is no route given, figure out where to go
        case "/":
          if(isLoggedIn)
            this.goToDefaultRoute();
          else
            this.goToLoginRoute();
        
        // The login route should be accessible only if the user is not currently logged in
        case this.loginRoute:
          if(!isLoggedIn) 
            return true;
          else 
            this.goToDefaultRoute(); 
        
        // By default, every route (besides /login) should only 
        // be accessible if the user is logged in
        default:
          if(!isLoggedIn) 
            this.goToLoginRoute();
          else
            console.info('AuthGuard: access granted to ' + state.url);
            return true;
      }      
    }).first();
  }
  
  /**
   *
   * Navigates to the default route
   */
  goToDefaultRoute() {
    // DEV ONLY
    console.info('AuthGuard: redirecting to default route');
    this.router.navigateByUrl(this.defaultRoute);
    return false;
  }

  /**
   *
   * Navigates to the login route
   */
  goToLoginRoute() {
    // DEV ONLY
    console.info('AuthGuard: redirecting to login route');
    this.router.navigateByUrl(this.loginRoute);
    return false;
  }


}