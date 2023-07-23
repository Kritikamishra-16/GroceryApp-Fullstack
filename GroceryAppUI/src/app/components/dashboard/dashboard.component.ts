import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {
  
  public users: any=[];
  public fullName:string="";
  public role!:string;
  public isLoggedIn: boolean=false;
  searchKey: string="";
  public searchTerm:string="";
  public filterCategory:any;
  public p:number=0;

  products!:Product[];
  imageBaseUrl="https://localhost:7009/resources/";

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private userStore: UserStoreService,
    private productService: ProductService,
    private router: Router,
    private toast: NgToastService
  ) {}

  getProducts(){
    this.productService.getAll().subscribe({
      next:(resp)=>{
        this.products=resp;
        this.filterCategory=resp;
        console.log(this.products);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    //console.log(this.searchTerm);
    this.searchKey=this.searchTerm;
  }


  ngOnInit(){
    this.isLoggedIn=this.auth.isLoggedIn();

    this.api.getUsers().subscribe(res=>{
      this.users=res;
    });
    //get fullName from observable before refersh and from token(localstorage) after refersh
    this.userStore.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFormToken();
        this.fullName=val || fullNameFromToken;
      });

    //get role from observable before refersh and from token(localstorage) after refersh
    this.userStore.getRoleFormStore()
    .subscribe(val=>{
      const roleFromToken= this.auth.getRoleFromToken();
      this.role=val|| roleFromToken;
    }) 

    this.getProducts();
  }

  logout(){
    console.log("out");
    this.auth.signOut();
  }

  deleteProduct(product:any){
    console.log(product);
    this.productService.deleteEmployee(product.id)
    .subscribe((data)=>{
        this.products= this.products.filter((u:any)=>u!==product);
        this.toast.success({detail:"SUCCESS", summary: "Product deleted successfully", duration: 5000});
    })
  }

  

  filter(category:string){
    this.filterCategory=this.products.filter((a:any)=>{
      if(a.productCategory==category || category=='')
      {
        console.log(a);
        return a;
      }
    })
  }

  productDetails(id:string){
    this.router.navigate(['dashboard/product-details',id]);
  }

}
