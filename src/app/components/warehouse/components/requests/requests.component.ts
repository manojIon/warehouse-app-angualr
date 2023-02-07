import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopdataService } from 'src/services/shopdata.service';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  @ViewChild("mdvieworder")mdvieworder:any = ElementRef;

  p: number = 1;

  modifiedDate:any;

   modDate(d:any){
     let datepipeval = this.datefilter.transform(d, 'mediumDate');
     this.modifiedDate = datepipeval;
   }

  searchDate: any;
  searchOrderby:any = "";
  searchsupp:any = "";
  searchstatus:any = "";

  supplyList:any;

  ordersList:any;
  getId:any;

  orderStatus = [ 
    {name:"In Progress"},
    {name: "Outstand"},
    {name:"Delivered"},
    {name: "Returned"},
  ]

  orderBy =[
    {name:"Mia"},
    {name:"Big Guy"}
  ]

  constructor(private db:ShopdataService, private datefilter: DatePipe) { }


// View edit model
vieworderhide(){
  this.mdvieworder.nativeElement.style.display = "none"
}

viewordershow(){
  this.mdvieworder.nativeElement.style.display = "block"
}

   getorders() {
     this.db.getshoporders().subscribe(
      response => {
        this.ordersList = response
      }
     )
   }


   getproductsname() {
      this.db.getmanufactures().subscribe(
        res => {
          this.supplyList = res;
        }
      )
   }

   viewproductname:string = '';
   viewunits:number = 0;
   vieworderby:string = '';
   viewmanufacture:string = '';
   viewpriority:string = '';
   viewstatus:string = '';
   viewdeldate:string = '';
   viewcomments:string = '';
   viewwarehousecomments:string = '';

   viewdetails(id:any){
      this.viewordershow();
      this.ordersList.map((e: any) => {
        if (e.id === id) {
          this.getId = id;
          let productid = this.ordersList[this.ordersList.indexOf(e)];
          this.viewproductname = productid.productname
          this.viewmanufacture = productid.manufacture
          this.vieworderby = productid.orderby
          this.viewunits = productid.units
          this.viewpriority = productid.priority
          this.viewcomments = productid.comments
          this.viewwarehousecomments = productid.warehousecomments
          this.viewstatus = productid.status
        }
      })
   }
  
   updateorder(){
      let record:any = {};

      record['warehousecomments'] = this.viewwarehousecomments;

      this.db.updateorder(this.getId, record);

      this.vieworderhide();
   }

  ngOnInit(){

    this.getorders();
    this.getproductsname();
  }

}
