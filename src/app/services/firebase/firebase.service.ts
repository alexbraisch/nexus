import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class FirebaseService {

       
  // Constructor   
  constructor(
    private _af: AngularFire, 
    private _router: Router,
    private _settings: AppSettingsService) {

  }
  
  /**
   * Creates a new user with a provided email and password.
   * 
   */
  createUser(email:string, password:string) {
    this._af.auth.createUser({email, password}).catch(function(error) {
      // Handle errors
      var errorName = error.name;
      var errorMessage = error.message;
      console.info('FB Service::Create User: ' + errorName + ' ' +errorMessage);
    });
  }
  
  /**
   * Tries to authenticate a user against Firebase Authentication
   * with a provides email/password combo.
   *
   */  
  signIn(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this._af.auth.login({email: email, password: password})
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        })
    });
  }
  
  /**
   * Sign the currently authenticated user out.
   * Also deletes the auth. token issued by Firebase.
   *
   */
  signOut() {
    let router      = this._router;
    let goToRoute   = this._settings.loginRoute;
    
    // Logout
    console.log('Sign out...');
    this._af.auth.logout().then(function(){
      // Redirect to login
      router.navigate([goToRoute]);
    });
  }
  
  /**
   * Returns the currently signed in user.
   *
   */
  getCurrentUser() {
    return this._af.auth.getAuth();
  }  

}
