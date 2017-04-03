import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './route-guards/AuthGuard';

// Pages
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {LoginComponent} from './components/pages/login/login.component';
import {WorkspacesComponent} from './components/pages/workspaces/workspaces.component';

const appRoutes:Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },  
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {path: 'workspaces', component: WorkspacesComponent}
    ]
  }
];


export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
