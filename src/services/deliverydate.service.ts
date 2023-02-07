import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DeliverydateService {

  constructor(private datefilter:DatePipe) { }

  month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


  // Mar 20, 2022 -> Mar 27, 2022
  getdate(){
      let deldate = new Date(new Date().setDate(new Date().getDate() + 7));
      let finaldate = this.datefilter.transform(deldate, "mediumDate");
      return finaldate;
  }
}
