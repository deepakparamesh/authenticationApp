import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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
import { AdminLoginComponent } from './component-admin/admin-login/admin-login.component';
import { AdminSettingsComponent } from './component-admin/admin-settings/admin-settings.component';
import { AdminNavbarComponent } from './component-admin/admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './component-admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './component-admin/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    AdminLoginComponent,
    AdminSettingsComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AppRoutingModule
  ],
  providers: [ValidateService, AuthenticationService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }