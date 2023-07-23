import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent {

  cartItems:any;
  imageBaseUrl="https://localhost:7009/resources/";
  orderedProducts: any[]=[];


 constructor(
  private productService: ProductService,
  private userStore: UserStoreService,
  private auth: AuthService,
  private router: Router,
  private toast: NgToastService
 ) {
  this.productService.cartItem.subscribe((val)=>{
    this.cartItems=val;
    console.log(this.cartItems);
  })

 }

 ngOnInit(): void{
  
 }

 removeOrderedProducts(){
  for (const orderedProduct of this.orderedProducts) {
    console.log("del");
    this.productService.DeleteCartItem(orderedProduct.productId)
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }
 }


 onSelectionChange(product: any) {
  if (!product.selected) {
    // Remove the product from the array
    const index = this.orderedProducts.indexOf(product);
    if (index > -1) {
      this.orderedProducts.splice(index, 1);
    }
  }else{
    console.log(product);
    this.orderedProducts.push(product);
  }
}

 storeProductsInOrderDB(){

  this.removeOrderedProducts();

  //getting userId
  let userId="";
  this.userStore.getIdFromStore()
  .subscribe(val=>{
    let IdFromToken=this.auth.getIdFromToken();
    userId=val || IdFromToken;
  });

  this.orderedProducts.forEach((product) => {

    //getting cartData
    let orderData: any={
      id: 0,
      userId,
      productId: product.productId,
      Quantity: product.quantity,
      orderDate: new Date().toDateString()
    }
    console.log(orderData);

    this.productService.addOrder(orderData)
    .subscribe({
      next: (res)=>{
        console.log('Item added:', res);
        //alert("Order Placed");
        this.router.navigate(['/dashboard/myorders']).then(() => {
          // Delay the reload by 100 milliseconds
          this.toast.success({detail:"SUCCESS", summary: "Order Placed", duration: 5000});

          setTimeout(() => {
            location.reload();
          }, 100);
        });
      },
      error: (err)=>{
        this.toast.error({detail:"ERROR", summary: "Something went wrong!", duration: 5000});
        console.error('Error adding item:', err);
      }
    });
  });
}

handleQuantity(val : string,product: any){
  if(product.quantity<20 && val==='plus'){
    product.quantity+=1;
  }
  else if(product.quantity>1 && val==='min')
  {
    product.quantity-=1;
  }
}


}
