import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablefilter'
})
export class TablefilterPipe implements PipeTransform {

  transform(value: any, searchOrderby: string) {
    if(value.length === 0 || searchOrderby == ''){
      return value;
    }

    const resdata = [];

    // order['orderDate'] == modifiedDate &&

    for(const order of value){
      if(order['orderby'].toLowerCase() == searchOrderby.toLowerCase()){
        resdata.push(order);
      }
    }
    return resdata
  }

}
