import { Component, OnInit } from '@angular/core';
import { ShopdataService } from 'src/services/shopdata.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  
  menulist:any = [
    {icon:'dashboard',name:'Dashboard', url:'/warehouse/dashboard'},
    {icon:'cart',name:'Orders', url:'/warehouse/orders'},
    {icon:'product',name:'Inventory', url:'/warehouse/products'},
    {icon:'requests',name:'Requests', url:'/warehouse/requests'},
  ]

  expandview:boolean = false;

  orderList:any = [];

  constructor() { }

  ngOnInit(){
    
  }

}
