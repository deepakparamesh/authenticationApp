import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Http, Headers} from '@angular/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password : String;

  constructor(private authenticationService : AuthenticationService,
              private validateService : ValidateService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private http:Http) { } 

  ngOnInit() {
    
  }

  onLogin(){

    const user = {
      email: this.email,
      password: this.password
    }
    
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('please fill all the fields', {cssClass: 'alert-danger', timeout: 2000} );
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('please enter valid email', {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    this.authenticationService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authenticationService.storeUserData(data.token, data.user);
        this.flashMessage.show('succefully loggedin !', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout:2000});
        this.router.navigate(['login']);
      }
    });
    
  }

  onGoogleLogin(){
    this.http.get('http://localhost:5000/users/google')
    
  }

}