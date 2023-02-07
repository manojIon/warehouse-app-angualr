import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supplier'
})
export class SupplierPipe implements PipeTransform {

  transform(value:any, searchsupp:any){
    if(searchsupp == ''){
      return value;
    }

    let res = [];

    for(const item of value){
       if(item['manufacture'].toLowerCase().includes(searchsupp.toLowerCase())){
         res.push(item)
       }
    }

    return res;
 }

}
