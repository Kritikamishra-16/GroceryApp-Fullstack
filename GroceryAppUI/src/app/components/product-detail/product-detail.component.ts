import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  productData:Product | undefined;
  imageBaseUrl="https://localhost:7009/resources/";
  productQuantity:number=1;

  isFavorite: boolean = false;
  isFavoriteFilled: boolean = false;

  cartItems:any;
  removeCart:boolean=false;

  productRating:any;



  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.isFavoriteFilled = !this.isFavoriteFilled;
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private auth: AuthService,
    private userStore: UserStoreService,
    private toast: NgToastService
  ) {
    
  }

  ngOnInit(): void{
    let productId=this.activateRoute.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId)
    .subscribe((data)=>{
      this.productData=data;
    })

    this.productService.cartItem.subscribe((val)=>{
      this.cartItems=val;
    })

    if(productId && this.cartItems)
    {
      let items=this.cartItems;
      console.log(items);
      items=items.filter((item:cart)=>productId===item.productId
      ?.toString());
      if(items.length)
      {
        this.removeCart=true;
      }else{
        this.removeCart=false;
      }
    }

    if(productId)
    {
      this.getProductRating(productId);

    }

    // Retrieve stored values from localStorage if available
    let storedProductQuantity = localStorage.getItem('productQuantity');

    // Set the stored values to the component variables
    if (storedProductQuantity) {
      this.productQuantity = parseInt(storedProductQuantity, 10);
    }


   
  }

  ratingCount=0;
  totalRating=0;

  finalRating:any;

  getProductRating(productId: string){
    this.productService.getRatingsByProductId(productId)
    .subscribe({
      next:(res)=>{
        this.productRating=res;
        console.log(this.productRating);
        this.productRating.map((rate:any)=>{
          this.ratingCount+=1;
          this.totalRating+=rate.ratingValue;
        })
        this.finalRating=(this.totalRating/this.ratingCount).toFixed(2);
      }
    });
  }

  handleQuantity(val : string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min')
    {
      this.productQuantity-=1;
    }

     // Store the productQuantity value in localStorage
     localStorage.setItem('productQuantity', this.productQuantity.toString());

  }

  addToCart(){
    if(this.productData){
      if(!this.authService.isLoggedIn())
      {
        this.router.navigate(['/login']);
      }
      else{
        console.log("logged in user");
        //getting userId
        let userId="";
        this.userStore.getIdFromStore()
        .subscribe(val=>{
          let IdFromToken=this.auth.getIdFromToken();
          userId=val || IdFromToken;
        });

        //getting cartData
        let cartData: cart={
          id: 0,
          userId,
          productId: this.productData.id,
          Quantity: this.productQuantity
        }
        
        this.productService.addToCart(cartData)
        .subscribe((result)=>{
          console.log(result);
          //alert('product is added to cart');
          this.removeCart=true;
            // Reload the navigation page
          this.router.navigate(['/dashboard']).then(() => {
            // Reload the current page after navigating to the navigation page
            location.reload();
            this.toast.success({detail:"SUCCESS", summary: "Product is added to cart", duration: 5000});

          });
        })
      }
    }
  }

  removeToCart(){
    let productId=this.activateRoute.snapshot.paramMap.get('id');
    this.productService.DeleteCartItem(productId)
    .subscribe((result)=>{
      console.log(result);
     // alert('product is deleted from cart');
      this.removeCart=false;
        // Reload the navigation page
        this.router.navigate(['/dashboard']).then(() => {
          // Reload the current page after navigating to the navigation page
          location.reload();
          this.toast.success({detail:"SUCCESS", summary: "Product is deleted from cart", duration: 5000});

        });
    })
  }

}
