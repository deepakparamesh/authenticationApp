import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authencticationService : AuthenticationService,
    private validateService : ValidateService,
    private router: Router) { } 

  ngOnInit() {
    
  }

  onLogout(){
    this.authencticationService.logout();
    console.log('you are logged out');
    this.router.navigate(['/login']);
    return false;
  }

}
