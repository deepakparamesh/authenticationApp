import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'; 
import { AuthenticationService } from '../services/auth.service';


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, 
                private router : Router){}

    canActivate(){
        if(this.authenticationService.adminLoggedIn()){
            return true;
        } else {
            this.router.navigate(['/admin-login']);
            return false;
        }
    }
}