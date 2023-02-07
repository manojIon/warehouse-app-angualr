import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components/warehouse/components/dashboard/dashboard.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ShopComponent } from './components/shop/shop/shop.component';
import { ShopdashboardComponent } from './components/shop/components/shopdashboard/shopdashboard.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { OrdersComponent } from './components/warehouse/components/orders/orders.component';
import { RequestsComponent } from './components/warehouse/components/requests/requests.component';
import { ProductsComponent } from './components/warehouse/components/products/products.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


//import { AngularFireModule} from '@angular/fire/compat'
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { TablefilterPipe } from './pipes/tablefilter.pipe';
import { StatusfilterPipe } from './pipes/statusfilter.pipe';
import { DatefilterPipe } from './pipes/datefilter.pipe';
import { InventoryPipe } from './pipes/inventory.pipe';
import { SupplierPipe } from './pipes/supplier.pipe';
import { ShopinventoryComponent } from './components/shop/components/shopinventory/shopinventory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    DashboardComponent,
    WarehouseComponent,
    ShopComponent,
    ShopdashboardComponent,
    PagenotfoundComponent,
    HeaderComponent,
    OrdersComponent,
    TablefilterPipe,
    StatusfilterPipe,
    DatefilterPipe,
    ProductsComponent,
    InventoryPipe,
    RequestsComponent,
    SupplierPipe,
    ShopinventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
   // AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [ProductsComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
