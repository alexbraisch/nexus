import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Translation
import { TranslateModule } from 'ng2-translate';

// Firebase
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Routing
import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard } from './route-guards/AuthGuard';

import { AppComponent } from './app.component';
import { WorkspacesComponent } from './components/pages/workspaces/workspaces.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyAn4tp5Ty4ojtBjFZPRuvooycECdq-SiW0",
  authDomain: "nexus-6ba24.firebaseapp.com",
  databaseURL: "https://nexus-6ba24.firebaseio.com",
  projectId: "nexus-6ba24",
  storageBucket: "nexus-6ba24.appspot.com",
  messagingSenderId: "877672017617"
};

// Firebase Auth Config
// Specifies witch auth methods we'll be using.
// At this time, only email/password authentication is supported.
export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    AppComponent,
    WorkspacesComponent,
    LoginComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    routing,
    TranslateModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
