import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public users: any=[];
  public fullName:string="";
  public role!:string;
  public isLoggedIn: boolean=false;
  public userId!:string;
  itemCount:number=0;
  cartItems: any;


  constructor(
    private auth: AuthService,
    private api: ApiService,
    private userStore: UserStoreService,
    private productService: ProductService
  ) {}




  ngOnInit(){
    this.isLoggedIn=this.auth.isLoggedIn();
    console.log(this.isLoggedIn);
    this.api.getUsers().subscribe(res=>{
      this.users=res;
      console.log(this.users);
    });
    //get fullName from observable before refersh and from token(localstorage) after refersh
    this.userStore.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFormToken();
        this.fullName=val || fullNameFromToken;
      });

    this.userStore.getRoleFormStore()
    .subscribe(val=>{
      const roleFromToken= this.auth.getRoleFromToken();
      this.role=val|| roleFromToken;
    }) 

    this.userStore.getIdFromStore()
    .subscribe(val=>{
      const idFromToken= this.auth.getIdFromToken();
      this.userId=val|| idFromToken;
    }) 

    //calling api for getting cart items
    this.productService.getCartItemsByUserId(this.userId)
    .subscribe((result)=>{
      this.cartItems=result;
      this.cartItems.forEach((item:any,idx:number) => {
        this.productService.getProduct(item.productId)
        .subscribe((result)=>{
          //console.log(result);
          this.cartItems[idx].productDetails=result;
        })
      });

      this.itemCount=this.cartItems.length;
      //console.log(this.cartItems);

      if(this.itemCount!=0)
      {
        this.productService.cartItem.next(this.cartItems);
      }

    });
    
    

  }

  logout(){
    console.log("out");
    this.auth.signOut();
    
  }

}
