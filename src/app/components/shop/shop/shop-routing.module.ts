import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../../pagenotfound/pagenotfound.component';
import { ShopdashboardComponent } from '../components/shopdashboard/shopdashboard.component';
import { ShopinventoryComponent } from '../components/shopinventory/shopinventory.component';


const routes: Routes = [

  {
    path:'',
    component: ShopdashboardComponent
  },
  {
    path:'dashboard',
    component: ShopdashboardComponent
  },
  {
    path:'products',
    component: ShopinventoryComponent
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
