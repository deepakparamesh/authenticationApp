import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: Object;
  profileObj : Object;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private authenticationService:AuthenticationService, private router:Router,
              private http : Http) { }

  ngOnInit() {
    this.authenticationService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
     err => {
       console.log(err);
       return false;
     });
  }

  updateProfile(user){
    console.log(user);
    
    this.profileObj = {
      "username" : user.username,
      "email" : user.email
    }
    
    console.log(this.profileObj);
    
    // const url = `${"http://localhost:3000/users/updateProfile"}`;
    // this.http.put(url, JSON.stringify(this.profileObj), {headers: this.headers})
    //   .toPromise()
    //   .then(()=>{
    //     this.router.navigate(['/profile']);
    //   })
    // const url = `${"http://localhost:5555/products"}/${this.id}`;
    // this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
    //   .toPromise()
    //   .then(() => {
    //     this.router.navigate(['/']);
    //   })
    
  }
}
