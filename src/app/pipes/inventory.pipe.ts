import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventory'
})
export class InventoryPipe implements PipeTransform {

  transform(value:any, searchProduct:any){
     if(searchProduct == ''){
       return value;
     }

     let res = [];

     for(const item of value){
        if(item['productname'].toLowerCase().includes(searchProduct.toLowerCase()) || item['manufacture'].toLowerCase().includes(searchProduct.toLowerCase())){
          res.push(item)
        }
     }

     return res;
  }

}


//(item['productname'].toLowerCase() == searchProduct.toLowerCase()) || (item['manufacture'].toLowerCase().include(searchProduct.toLowerCase()) )