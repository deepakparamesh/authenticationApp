import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from "angular2-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  sub : any;
  public auth2 : any;

  constructor(
    private authenticationService:AuthenticationService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    public auth: AuthService) { }

  ngOnInit() {
  }

  oauthLogin(provider){
    console.log('entered into oauth');
    
    this.sub = this.auth.login(provider).subscribe((data) => {
      console.log(data);
      // if(data)

     }
    )
  }

  onLoginSubmit(){
    const user ={
      username: this.username,
      password: this.password
    }
    
    this.authenticationService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this.authenticationService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
  });
  }
}
