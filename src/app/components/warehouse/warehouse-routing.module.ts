import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { RequestsComponent } from './components/requests/requests.component';


const routes: Routes = [

  {
    path:'',
    component: DashboardComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'orders',
    component: OrdersComponent
  },
  {
    path:'products',
    component: ProductsComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path:'**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
