import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email : String;
  password: String;

  constructor(private authenticationService : AuthenticationService,
    private validateService : ValidateService,
    private router: Router, 
    private flashMessage : FlashMessagesService) { }

  ngOnInit() {

  }

  onAdminLogin(){
    const admin = {
      email : this.email,
      password : this.password
    }
    if(!this.validateService.validateRegister(admin)){
      this.flashMessage.show('please fill all the fields', {cssClass: 'alert-danger', timeout: 2000} );
      return false;
    }
    if(!this.validateService.validateEmail(admin.email)){
      this.flashMessage.show('please enter valid email', {cssClass: 'alert-danger', timeout: 2000})
      return false;
    }

    this.authenticationService.authenticateAdmin(admin).subscribe(data => {
      if(data.success){
        this.authenticationService.storeAdminData(data.token, data.user);
        this.flashMessage.show('login successful !', {cssClass: 'alert-success', timeout:2000})
        this.router.navigate(['/admin-settings']);
        
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 2000})
        console.log(data.msg);
        this.router.navigate(['/admin-login'])
      }
    });
    
  }

}
