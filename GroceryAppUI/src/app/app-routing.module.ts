import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NavComponent } from './components/nav/nav.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ManageAdminComponent } from './components/manage-admin/manage-admin.component';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: NavComponent,
    children:[
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'product-details/:id',
        component: ProductDetailComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'edit/:id',
        component: EditProductComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'view-cart',
        component: ViewCartComponent
      },
      {
        path: 'myorders',
        component: MyOrdersComponent
      },
      {
        path: 'manage-admin',
        component: ManageAdminComponent
      },
      {
        path:'view-order',
        component: ViewOrderComponent
      }
      ,{
        path: 'help',
        component:CustomerServiceComponent
      }
    ]
  }
];

@NgModule({
  
  //imports: [RouterModule.forRoot(routes, { useHash: true })], 

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
