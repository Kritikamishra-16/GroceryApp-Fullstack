import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Status } from '../models/status';
import { cart } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rating } from '../models/Rating';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartItem= new BehaviorSubject<Product[]>([]);


  private baseurl:string ='https://localhost:7009/api/Product/';

  add(data: Product){
    console.log(data.productName);
    let formData=new FormData();
    formData.append("ProductName", data.productName);
    formData.append("ImageFile",data.ImageFile??"");
    formData.append("ProductCategory",data.productCategory);
    formData.append("ProductDescription",data.productDescription);
    formData.append("ProductPrice",data.productPrice?.toString());
    formData.append("AvailableQuantity",data.availableQuantity?.toString());
    formData.append("Discount",data.discount?.toString());
    formData.append("Specification",data.specification);
    
    console.log(formData);

    return this.http.post<Status>(this.baseurl+'add', formData);
  }

  getAll(){
    return this.http.get<Product[]>(this.baseurl+'getall');
  }

  getProduct(id: string){
    return this.http.get<Product>( this.baseurl+'GetProductById/'+id);
  }

  updateProduct(id: string, data: Product){
    let formData=new FormData();
    formData.append("ProductName", data.productName);
    formData.append("ImageFile",data.ImageFile??"");
    formData.append("ProductCategory",data.productCategory);
    formData.append("ProductDescription",data.productDescription);
    formData.append("ProductPrice",data.productPrice?.toString());
    formData.append("AvailableQuantity",data.availableQuantity?.toString());
    formData.append("Discount",data.discount?.toString());
    formData.append("Specification",data.specification);
    
    console.log(formData);
    return this.http.put<Status>(this.baseurl+'UpdateProduct/'+id, formData);
  }


  deleteEmployee(id:string){
    return this.http.delete<Product>(this.baseurl+'DeleteProduct/'+id);
  }

  addToCart(cartData: cart){
    //console.log(cartData);
    return this.http.post(`https://localhost:7009/api/Cart/AddCart`, cartData);

  }

  UpdateCartItem(item: cart)
  {
    return this.http.put(`https://localhost:7009/api/Cart/UpdateCartItem`,item);
  }

  DeleteCartItem(id: string| null){
    console.log(id);
    return this.http.delete(`https://localhost:7009/api/Cart/DeleteCartItem/`+id);
  
  }

  getCartItemsByUserId(userId:string)
  {
    return this.http.get(`https://localhost:7009/api/Cart/GetCartItems/`+userId);
  }


  /**Orders */

  addOrder(orderData: any){
    return this.http.post(`https://localhost:7009/api/Order/AddOrder`, orderData);

  }

  getOrderItemsByUserId(userId:string)
  {
    return this.http.get(`https://localhost:7009/api/Order/GetByUserId/`+userId);
  }

  searchTop5Orders(year:any,month:string):Observable<any>{
    return this.http.get(`https://localhost:7009/api/Order/GetTopFiveOrders/searchTop5Orders?month=${month}&year=${year}`);
  }

  /**Ratings */

  addRating( ratingData: Rating ){
    console.log(ratingData);
    return this.http.post(`https://localhost:7009/api/ratings`, ratingData);

  }

  getRatingsByProductId(productId: string){
    return this.http.get(`https://localhost:7009/api/ratings/`+ productId);
  }

  

  constructor(
    private http: HttpClient) { }
}
