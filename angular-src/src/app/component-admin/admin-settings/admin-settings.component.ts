import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  authSetting: String;

  constructor(private router: Router,
              private authenticationService : AuthenticationService) { }

  ngOnInit() {

  }

  onSet(){
    const setting = {
      auth: this.authSetting 
    }
    console.log(setting.auth);
  }

}
