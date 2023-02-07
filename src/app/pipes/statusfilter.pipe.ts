import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusfilter'
})
export class StatusfilterPipe implements PipeTransform {

  transform(value:any, searchstatus:any){
    if(value.length == 0 || searchstatus == ''){
      return value
    }

    const resdata = [];

    // order['orderDate'] == modifiedDate &&

    for(const order of value){
      if(order['status'] == searchstatus){
        resdata.push(order);
      }
    }
    return resdata

  }

}
