import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  onAdminLogout(){
    this.authenticationService.adminLogout();
    console.log('admin logged out');
    this.router.navigate(['/admin-home'])
    return false;
  }

  
}
