import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FilterPipe } from './shared/filter.pipe';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NavComponent } from './components/nav/nav.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageAdminComponent } from './components/manage-admin/manage-admin.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewOrderComponent } from './components/view-order/view-order.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddProductComponent,
    EditProductComponent,
    FilterPipe,
    ProductDetailComponent,
    NavComponent,
    ViewCartComponent,
    MyOrdersComponent,
    ManageAdminComponent,
    CustomerServiceComponent,
    ViewOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
