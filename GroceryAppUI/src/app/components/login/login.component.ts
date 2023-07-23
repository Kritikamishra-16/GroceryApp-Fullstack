import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string='fa-eye-slash';

  //FormGroup is a class that represents a collection of FormControl objects, which are used to track the value and validation state of an input field or form control.
  // the exclamation mark (!) is a TypeScript syntax called the non-null assertion operator. It is used to indicate that a variable or property will definitely have a non-null value at runtime, even if the TypeScript compiler is not able to infer it.
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    ){}

  ngOnInit():void{
    this.loginForm=this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text":this.type="password";
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      //send object to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res.message);
          this.loginForm.reset();
        
          this.auth.storeToken(res.token);
          //storing in store so dont need to refresh
          const tokenPayload=this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.userStore.setIdForStore(tokenPayload.id);


          this.toast.success({detail:"SUCCESS", summary: res.message, duration: 5000});
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR", summary: "Something went wrong!", duration: 5000});
          console.log(err);
        }
      })
    }else{
      //throw error using toaster and with required field
      console.log("invalid login data");
      ValidateForm.validateAllFormFields(this.loginForm);
    }


  }



}
