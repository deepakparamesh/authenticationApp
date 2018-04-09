import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'

import { FlashMessagesService } from 'angular2-flash-messages';
import {Router, Route} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: string;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authservice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user ={
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('please fill all the fields', {cssClass: 'alert-danger', timeout:3000})
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('please fill a valid email', {cssClass: 'alert-danger', timeout:3000})      
      return false;
    }

    //register user
    this.authservice.registerUser(user).subscribe(data => {
      if(data.success){
      this.flashMessage.show('you are now registered', {cssClass: 'alert-success', timeout:3000})              
      this.router.navigate(['/login'])
      }else{
        this.flashMessage.show('something went wrong', {cssClass: 'alert-success', timeout:3000})              
      this.router.navigate(['/register'])
      }
    })
  }

}
