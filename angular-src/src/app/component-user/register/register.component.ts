import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthenticationService } from '../../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: String;
  password : String;


  constructor(private validateService : ValidateService, 
              private flashMessage : FlashMessagesService,
              private authenticationService : AuthenticationService,
              private router : Router) { }

  ngOnInit() {

  }

  onRegister(){
    const user = {
      email: this.email,
      password : this.password
    }

    
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('please fill all the fields', {cssClass: 'alert-danger', timeout: 2000} );
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('please enter valid email', {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    //REGISTER USER
    this.authenticationService.registerUser(user).subscribe(data => {
      if(data.success){
      this.flashMessage.show('successfully registered', {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('something went wrong', {cssClass: 'alert-danger', timeout: 2000});
        this.router.navigate(['/register'])
      }
    });

  }

}
