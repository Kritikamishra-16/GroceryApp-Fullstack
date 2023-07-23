import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7009/api/User/";
  private userPayload: any;

  constructor(
    private http: HttpClient,
    private router: Router) { 
      this.userPayload=this.decodedToken();
    }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
    this.userPayload=undefined;

  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }

  getAllUsers()
  {
    return this.http.get<any>(`https://localhost:7009/api/User`);
  }

  updateUserAdminStatus(id:string, role:string){
    console.log(role);
    const url = `https://localhost:7009/api/User/updateUserAdminStatus/${id}?role=${role}`;
    return this.http.put(url,{});
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    //!!-> if there is a token it will return true else false
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper= new JwtHelperService();
    const token=this.getToken()!;
    //console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  //get fullName from token bcz after refersh observable is empty
  getFullNameFormToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
    else{
      this.userPayload=this.decodedToken();
    }
  }
  
  getRoleFromToken(){
    if(this.userPayload.role)
    return this.userPayload.role;
  }

  getIdFromToken(){
    if(this.userPayload.nameid)
    return this.userPayload.nameid;
  }

}
