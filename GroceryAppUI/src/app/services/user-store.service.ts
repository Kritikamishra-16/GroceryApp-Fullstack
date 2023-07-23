import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");
  private userId$=new BehaviorSubject<string>("");

  constructor() { }


  public getRoleFormStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string){
    this.role$.next(role);
  }

  //get fullName from observable before refersh
  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName: string){
    this.fullName$.next(fullName);
  }

  public getIdFromStore(){
    return this.userId$.asObservable();
  }

  public setIdForStore(fullName: string){
    this.userId$.next(fullName);
  }

}
