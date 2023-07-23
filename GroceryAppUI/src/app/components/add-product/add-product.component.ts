import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/product';
import { Status } from 'src/app/models/status';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  public addProductForm!: FormGroup;

  ImageFile?:File;

  status!: Status;


  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: Router,
    private toast: NgToastService
  ){
  }

  ngOnInit():void{
    this.addProductForm=this.fb.group({
      'id':[0],
      'productName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,100}$/)]],
      'productDescription': ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{1,255}$/)]],
      'productCategory': ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,100}$/)]],
      'availableQuantity': ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      'imageFile': ['', [Validators.required, Validators.pattern(/^.+\.(jpg|png)$/i)]],
      'productPrice': ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      'discount': ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      'specification': ['', [Validators.pattern(/^[a-zA-Z0-9 ]{0,100}$/)]]
    })
  }

  

  onPost(){
    this.status={
      statusCode:0,
      message:"Wait..."
    };

    if (this.addProductForm.valid) {
      // Form is valid, submit the data
      console.log('Form submitted!');
      const formData:Product =Object.assign(this.addProductForm.value);
      formData.ImageFile=this.ImageFile;
      console.log(formData);
      //we will call our service and pass this object to it

      this.productService.add(formData)
      .subscribe({
        next:(res)=>{
          this.status=res;
          this.toast.success({detail:"SUCCESS", summary: "Product Added Successfully", duration: 5000});
          this.route.navigate(['dashboard']);
        },
        error:(err)=>{
          this.status={
            statusCode:0,
            message:"Error on server side..."
          };
          this.toast.error({detail:"ERROR", summary: "Error while adding the product", duration: 5000});
          console.log(err);
        }
      })

    } else {
      // Form is invalid, display error messages or perform desired actions
      console.log('Form is invalid!');
    }
  }
  
  onChange(event:any){
    console.log(event.target.files[0]);
    this.ImageFile=event.target.files[0];
    console.log(this.ImageFile);

  }
  

}
