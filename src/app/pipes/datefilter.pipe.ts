import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datefilter'
})
export class DatefilterPipe implements PipeTransform {

  transform(value:any, modifiedDate:any){
    if(value.length == 0 || modifiedDate == '' || modifiedDate == undefined || modifiedDate == null){
      return value
    }

    const resdata = [];

    // order['orderDate'] == modifiedDate &&

    for(const order of value){
      if(order['orderdate'] == modifiedDate || order['delievertdate'] == modifiedDate){
        resdata.push(order);
      }
    }
    return resdata
  }

}
