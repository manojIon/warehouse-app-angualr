import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from 'src/services/route-guard.service';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ShopdashboardComponent } from './components/shop/components/shopdashboard/shopdashboard.component';
import { ShopinventoryComponent } from './components/shop/components/shopinventory/shopinventory.component';
import { ShopComponent } from './components/shop/shop/shop.component';
import { DashboardComponent } from './components/warehouse/components/dashboard/dashboard.component';
import { OrdersComponent } from './components/warehouse/components/orders/orders.component';
import { ProductsComponent } from './components/warehouse/components/products/products.component';
import { RequestsComponent } from './components/warehouse/components/requests/requests.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';


const routes: Routes = [
  {
    path:'',
    component: LoginpageComponent
  },
  {
    path:'login',
    component: LoginpageComponent
  },
  {
    path:'warehouse',
    component: WarehouseComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'requests',
        component: RequestsComponent
      }
    ]
  },
  {
    path:'shop',
    component: ShopComponent,
    canActivate: [RouteGuardService],
    children: [
      {
        path:'',
        component:ShopdashboardComponent
      },
      {
        path:'dashboard',
        component:ShopdashboardComponent
      },
      {
        path:'products',
        component:ShopinventoryComponent
      },
    ]
  },
  {
    path:'**',
    component:PagenotfoundComponent
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
