import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './component-user/navbar/navbar.component';
import { HomeComponent } from './component-user/home/home.component';
import { RegisterComponent } from './component-user/register/register.component';
import { LoginComponent } from './component-user/login/login.component';
import { DashboardComponent } from './component-user/dashboard/dashboard.component';
import { ProfileComponent } from './component-user/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { FlashMessagesModule  } from 'angular2-flash-messages';
import { AuthenticationService } from './services/auth.service';
import { AuthGuard } from './gaurds/auth.gaurd';
import { AdminGuard } from './gaurds/admin.gaurd';
import { AdminHomeComponent } from './component-admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './component-admin/admin-login/admin-login.component';
import { AdminSettingsComponent } from './component-admin/admin-settings/admin-settings.component';
import { AdminDashboardComponent } from './component-admin/admin-dashboard/admin-dashboard.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent },
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent , canActivate : [AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  
  //admin
  {path:'admin-login', component: AdminLoginComponent},
  {path:'admin-home', component: AdminHomeComponent},
  {path:'admin-settings', component: AdminSettingsComponent, canActivate : [AdminGuard]},
  {path:'admin-dashboard', component: AdminDashboardComponent, canActivate : [AdminGuard]},
]


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'register', component: RegisterComponent },
      {path:'login', component: LoginComponent},
      {path:'dashboard', component: DashboardComponent , canActivate : [AuthGuard]},
      {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      
      //admin
      {path:'admin-login', component: AdminLoginComponent},
      {path:'admin-home', component: AdminHomeComponent},
      {path:'admin-settings', component: AdminSettingsComponent, canActivate : [AdminGuard]},
      {path:'admin-dashboard', component: AdminDashboardComponent, canActivate : [AdminGuard]},
    ]),
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
