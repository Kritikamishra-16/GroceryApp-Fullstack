import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})

  export class ViewOrderComponent{
    yearList:any[]=[]
    currentYear:any
    monthList:any[]=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    monthRequired:any
    yearRequired: any
    productlistId:any
    productlist : any[]=[]
  
    constructor(private productService: ProductService){
      this.currentYear = new Date().getFullYear();
      const startYear=this.currentYear-10;
      const endYear=this.currentYear;
      for(let i=startYear; i<=endYear;i++)
      {
        this.yearList.push(i);
      }
    }

    yearSelected(year:any){
      this.yearRequired=year.target.value;
      console.log(this.yearRequired);
    }

    monthSelected(month:any){
      this.monthRequired=month.target.value;
      console.log(this.monthRequired);

    }

    search(){
      this.productService.searchTop5Orders(this.yearRequired,this.monthRequired)
      .subscribe((data)=>{
          this.productlistId=data;
          this.productlistId.forEach((product:any)=>{
            this.productService.getProduct(product)
            .subscribe((data)=>{
              this.productlist.push(data);
              console.log(this.productlist);
            })
          })
        },(error)=>{
          console.log(error);
        })
    }

  }
