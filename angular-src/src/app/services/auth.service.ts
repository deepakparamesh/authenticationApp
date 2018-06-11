import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  authToken : any;
  user : any;
  adminToken : any;
  admin : any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/users/register', user, {headers : headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/users/authenticate', user, {headers: headers})
      .map(res => res.json())
  }

  authenticateAdmin(admin){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/admins/authenticate', admin, {headers: headers})
    .map( res => res.json())
  }

  updateSetting(adminSetting){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/admins/setting/:_id', adminSetting, {headers : headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:5000/users/profile',  {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired('id_token')
  }

  storeAdminData(token, admin){
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.adminToken = token;
    this.admin = admin;
  }

  loadAdminToken(){
    const adminToken = localStorage.getItem('admin_token');
    this.adminToken = adminToken;
  }

  adminLogout(){
    this.adminToken = null;
    this.admin = null;
    localStorage.clear();
  }

  adminLoggedIn(){
    return tokenNotExpired('admin_token')
  }


}
