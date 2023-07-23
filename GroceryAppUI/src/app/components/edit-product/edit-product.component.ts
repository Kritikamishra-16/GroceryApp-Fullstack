import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  public addProductForm!: FormGroup;
  ImageFile?:File;
  id:any;


  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private url: ActivatedRoute,
    private router: Router,
    private toast: NgToastService

  ){
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

  ngOnInit():void{
    this.url.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
        if(this.id){
          //call api to get product info by id
          this.productService.getProduct(this.id)
          .subscribe((data)=>{
            console.log(data);
            this.addProductForm.patchValue(data);
          })
        }
      }
    })
  }

  updateProduct(){

    const formData:Product =Object.assign(this.addProductForm.value);
    formData.ImageFile=this.ImageFile;
    console.log(formData);
    this.productService.updateProduct(this.id, formData)
    .subscribe({
      next:(response)=>{
        this.toast.success({detail:"SUCCESS", summary: "Product updated successfully", duration: 5000});
        this.router.navigate(['dashboard']);
      },
      error:(err)=>{
        this.toast.error({detail:"ERROR", summary: "Something went wrong!", duration: 5000});
        console.log(err);
      }
    })

  }

  onChange(event:any){
    console.log(event.target.files[0]);
    this.ImageFile=event.target.files[0];
    console.log(this.ImageFile);

  }

  
  clearFields(): void {
    this.addProductForm.reset();
  }

  

}
