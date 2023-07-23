import { Component } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators, FormControl,ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string='fa-eye-slash';
  signUpForm!: FormGroup;
  passwordMismatch: boolean=false;


  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService){}

  ngOnInit():void{
    this.signUpForm=this.fb.group({
      fullName: ['',[Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.email]],
      phoneNumber: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required,Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required, this.matchPassword.bind(this)]]
    })
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value: string = control.value;
  
      // Regular expressions to check for the presence of special characters, numbers, and alphabets
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /[0-9]/;
      const alphabetRegex = /[a-zA-Z]/;
  
      if (!specialCharRegex.test(value) || !numberRegex.test(value) || !alphabetRegex.test(value)) {
        return { invalidPassword: true };
      }
  
      return null;
    };
  }
  

  matchPassword(control: FormControl): { [key: string]: boolean } | null {
    const password = this.signUpForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSignUp(){
    if(this.signUpForm.valid && !this.passwordMismatch){
      //perform logic for signup
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          //alert(res.message);
          this.toast.success({detail:"SUCCESS", summary: res.message, duration: 5000});
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          this.toast.error({detail:"ERROR", summary: err?.error.message, duration: 5000});
          console.log(err?.error.message);
        })
      })
    }
    else{
      console.log("Invalid form fields");
      this.toast.error({detail:"ERROR", summary: "Invalid form fields", duration: 5000});
      ValidateForm.validateAllFormFields(this.signUpForm);
      //logic for throwing validation error
    }
  }

  


  hideShowPass(){
    this.isText=!this.isText;
    this.isText? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text":this.type="password";
  }
  
  type2:string="password";
  isText2:boolean=false;
  eyeIcon2:string='fa-eye-slash';
  hideShowPass2(){
    this.isText2=!this.isText2;
    this.isText2? this.eyeIcon2="fa-eye": this.eyeIcon2="fa-eye-slash";
    this.isText2? this.type2="text":this.type2="password";
  }



  


}
