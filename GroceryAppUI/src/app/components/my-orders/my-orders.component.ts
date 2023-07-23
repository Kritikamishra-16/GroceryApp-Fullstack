import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Rating } from 'src/app/models/Rating';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
 
    public userId!:string;
    orderItems: any;
    imageBaseUrl="https://localhost:7009/resources/";
 


  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private productService: ProductService,
    private router: Router,
    private toast: NgToastService
  ) {
    
  }

   
  ngOnInit(){
     this.userStore.getIdFromStore()
    .subscribe(val=>{
      const idFromToken= this.auth.getIdFromToken();
      this.userId=val|| idFromToken;
    }) 


     //calling api for getting cart items
    this.productService.getOrderItemsByUserId(this.userId)
    .subscribe((result)=>{
      this.orderItems=result;
      this.orderItems.forEach((item:any,idx:number) => {
        this.productService.getProduct(item.productId)
        .subscribe((result)=>{
          this.orderItems[idx].productDetails=result;
          console.log(this.orderItems[idx]);

        })
      });
     });

  }


  ratingControl=new FormControl(0);
  getRating(product: any){
    console.log(this.ratingControl.value); 

    let ratingData:Rating={
      id:0,
      productId: product.productId,
      userId: this.userId,
      RatingValue: this.ratingControl.value
    }
    console.log(ratingData);

    this.productService.addRating(ratingData)
    .subscribe({
      next:(result)=>{
        console.log("Rating added successfully");
        this.toast.success({detail:"SUCCESS", summary: "Rating added successfully", duration: 5000});

      },error: (err)=>{
        console.log("Error in adding rating "+err);
        this.toast.error({detail:"ERROR", summary: "Error while rating", duration: 5000});

      }
    })

  }
  
  

    
}
