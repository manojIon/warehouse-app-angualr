import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ProductsComponent } from '../products/products.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  p: number = 1;

  ordersList:any;
  searchOrderby:any = "";
  searchstatus:any = "";
  searchDate:any = "";

  orderbyList=[
    {name:"John Doe"},
    {name: "Jane Doe"}
  ]

  orderStatus=[
    {name:"In Progress"},
    {name: "Outstand"},
    {name:"Delivered"},
    {name: "Returned"},
  ]



 modifiedDate:any;
 resdata:any

 month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

 modDate(e: string){
  if(e != ""){
      const year = e.toString();
      const monthname = Number(new Date(e).getMonth() )
      this.modifiedDate = `${this.month[monthname]} ${year.substring(8)}, ${year.substring(0,4)}`
      console.log(this.modifiedDate, typeof(this.modifiedDate))
  }else{
    this.modifiedDate = ""
  }
}

 datepictype:string = "text";

  changetodate() {
    this.datepictype = "date"
  }

  changetotext() {
    this.datepictype = "text"
  }


  constructor(private dataservice:DataService, private prductData: ProductsComponent) { }

  inStock:any;

  gotdata:boolean = true;

  getData:any;

  productsList:any = [];

  getproductDetails(){
    
    this.dataservice.getproductsList().subscribe(response => {
      
      this.productsList = response.map(e => {
         let otherinfo:any = e.payload.doc.data();
        return {
          id: e.payload.doc.id,
          productname: otherinfo['productname'],
          manufacture: otherinfo['manufacture'],
          currentUnit: otherinfo['currentUnit'],
          base:otherinfo['base'],
          comments:otherinfo['comments']
        };
      })

      console.log("result", this.productsList);

      this.inStock = this.productsList.filter((e:any) => {
           if(e['currentUnit'] > 10){
            return e;
           }
          
      })

       console.log(this.inStock)
  })
  
}


getorderslist(){
  this.dataservice.getordersList().subscribe(
    res => {
      this.ordersList = res.map(e => {
        return e;
      })
    }
  )
}

  ngOnInit(){
    this.getproductDetails();
    this.getorderslist()
  }

}
