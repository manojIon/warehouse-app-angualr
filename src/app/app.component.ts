import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from './components/warehouse/components/products/products.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private productList: ProductsComponent){}


  ngOnInit(){
    console.log(this.productList.productsList)
  }
}
