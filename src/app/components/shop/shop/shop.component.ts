import { Component, OnInit } from '@angular/core';
import { ShopdataService } from 'src/services/shopdata.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  menulist:any = [
    {icon:'dashboard',name:'Dashboard', url:'/shop/dashboard'},
    {icon:'product',name:'Inventory', url:'/shop/products'},
  ]

  expandview:boolean = false;

  orderList:any = [];

  constructor(private dataservice:ShopdataService) { }


  getorders(){
    this.dataservice.getshoporders().subscribe(
      resp => {
      this.orderList = resp.map(d => { return d })

      this.dataservice.sendData(this.orderList);
     // console.log(this.orderList)
      }
    )
  }

  ngOnInit(){
    // this.getordersList();
  }

}
