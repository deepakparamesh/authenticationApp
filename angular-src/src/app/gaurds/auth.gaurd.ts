import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
// import { AuthenticationService } from './cuppaOAuth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, 
                private router : Router){}

    canActivate(){
        if(this.authenticationService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}