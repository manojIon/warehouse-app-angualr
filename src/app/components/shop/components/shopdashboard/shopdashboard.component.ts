import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeliverydateService } from 'src/services/deliverydate.service';
import { ShopdataService } from 'src/services/shopdata.service';


@Component({
  selector: 'app-shopdashboard',
  templateUrl: './shopdashboard.component.html',
  styleUrls: ['./shopdashboard.component.scss']
})
export class ShopdashboardComponent implements OnInit {


 
 @ViewChild("mdneworder")mdneworder:any = ElementRef;
 @ViewChild("mdvieworder")mdvieworder:any = ElementRef;

  p: number = 1;

  ordersList:any;
  productnameList:any = [];
  supplyList:any = [];
  ordertypeList:any = [];

   // filters
   searchOrderby:any = "";
   searchstatus:any = "";
   searchDate:any = "";
   searchsupp:any = "";


   modifiedDate:any;

   modDate(d:any){
     let datepipeval = this.datefilter.transform(d, 'mediumDate');
     this.modifiedDate = datepipeval;
   }

   orderbyList=[
     {name:"Mia"},
     {name: "Big Guy"}
   ]
 
   orderStatus=[
     {name:"In Progress"},
     {name: "Outstand"},
     {name:"Delivered"},
     {name: "Returned"},
   ]
 
   priority = [
     {name:"High"},
     {name: "Moderate"},
     {name: "Low"},
   ]

   

  constructor(private dataservice:ShopdataService, private deldateService: DeliverydateService, private fb: FormBuilder, private datefilter: DatePipe) { }

  addorderForm = this.fb.group({
    ordertype: ['', Validators.required],
    units:['', Validators.required],
    orderby:['', Validators.required],
    supplier:['', Validators.required],
    priority:['', Validators.required],
    shopcomments:['', [Validators.minLength(1), Validators.maxLength(100)]]
  })

  getorderList(){
    this.dataservice.getshoporders().subscribe(
      resp => {
        this.ordersList = resp;

        console.log(resp);

        let todayDate = new Date().getDate();
        //May 25, 2022
          this.ordersList.map((e:any) => {
            let gotdata = `${e.delieverydate.substring(e.delieverydate.length - 4)}, ${this.month.indexOf(e.delieverydate.substring(0,3)) + 1}, ${e.delieverydate.substring(4,6)}`;
            if(todayDate > new Date(gotdata).getDate()){
              let record :any = {};
              record['status'] = this.orderStatus[1].name
              this.dataservice.updateorder(e.id, record);
            }
          })
      },
      error => {
        console.log(error);
      }
      
      

    )
  }

  getproducts(){
    this.dataservice.getproducts().subscribe(
      (response => {
        this.productnameList = response
        // console.log(this.productnameList)
      })
    )
  }

  getmanufactures(){
    this.dataservice.getmanufactures().subscribe(
      (response => {
        this.supplyList = response
        // console.log(this.supplyList)
      })
    )
  }

  //Add new order
  addorderDetails(){
    let record: any = {};
    // record['orderdate'] = `${month[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`;
    record['orderdate'] = this.datefilter.transform(new Date(), "mediumDate")
    // record['delievertdate'] = this.datefilter.transform(new Date().setDate(new Date().getDate() + 7), "mediumDate")
    record['deliverydate'] = this.deldateService.getdate();
    record['productname'] =  this.addorderForm.value.ordertype;
    record['manufacture'] =  this.addorderForm.value.supplier;
    record['orderby'] =  this.addorderForm.value.orderby;
    record['units'] =  this.addorderForm.value.units;
    record['priority'] =  this.addorderForm.value.priority;
    record['comments'] =  this.addorderForm.value.shopcomments;  
    record['status'] =  this.orderStatus[0].name;

    //console.log(record)

    this.dataservice.addorder().add(record);
    this.addorderForm.reset()

   this.neworderhide();
  }



   // order details model
   newordershow(){
    this.mdneworder.nativeElement.style.display = "block";
  }

  neworderhide(){
    this.mdneworder.nativeElement.style.display = "none"
  }

  month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

//   getdate(){
//     let deldate = new Date(new Date().setDate(new Date().getDate() + 7))
//     console.log(`${this.month[deldate.getMonth()]} ${deldate.getDate()}, ${deldate.getFullYear()}`);
// }

// View edit model
vieworderhide(){
  this.mdvieworder.nativeElement.style.display = "none"
}

viewordershow(){
  this.mdvieworder.nativeElement.style.display = "block"
}

viewproductname:string = "";
viewmanufacture:string = "";
vieworderby:string = "";
viewunits:number | undefined;
viewpriority:string = "";
viewcomments:string = "";
viewwarehousecomments:string = "";
viewstatus:string = "";
vieworderdate:string  = "";
viewdeldate:any;

getid:string = "";



vieworderDetails(id:any){
  //console.log(id)
  this.getid = id
  this.viewordershow();
  this.ordersList.map((e: any) => {
    if (e.id === id) {
      let productid = this.ordersList[this.ordersList.indexOf(e)];
      let deldateformat = productid.deliverydate.split(' ');
       if(deldateformat[1].length == 2){
        this.viewdeldate = this.datefilter.transform(new Date(deldateformat[2], this.month.indexOf(deldateformat[0]), deldateformat[1].substring(0,1)),'yyyy-MM-dd');
       }else
       this.viewdeldate = this.datefilter.transform(new Date(deldateformat[2], this.month.indexOf(deldateformat[0]), deldateformat[1].substring(0,2)),'yyyy-MM-dd');
      this.viewproductname = productid.productname
      this.viewmanufacture = productid.manufacture
      this.vieworderby = productid.orderby
      this.viewunits = productid.units
      this.viewpriority = productid.priority
      this.viewcomments = productid.comments
      this.viewwarehousecomments = productid.warehousecomments
      this.viewstatus = productid.status
      this.vieworderdate = productid.orderdate
    }
  })
}


updateorder(){
  let record:any = {};

  record['orderdate'] = this.vieworderdate;
  record['delieverydate'] = this.moddeldate(this.viewdeldate);
  record['productname'] =  this.viewproductname;
  record['manufacture'] =  this.viewmanufacture;
  record['orderby'] =  this.vieworderby;
  record['units'] =  this.viewunits;
  record['priority'] =  this.viewpriority;
  record['comments'] =  this.viewcomments;  
  record['status'] =  this.viewstatus;

  this.dataservice.updateorder(this.getid, record);
  this.vieworderhide();
  
}

 // view delivery date in the table format 2022-05-23 to May 23, 2022
 moddeldate(e:any){
  
  if(e != ""){
    
    const d = e.toString();
    console.log(d);

    let darray = d.split('-');

    //[2022, 06, 05] Y-M-D




    if(darray[2].split('')[0] == 0) {
        return `${this.month[Number(darray[1]) - 1]} ${darray[2].split('')[1]}, ${darray[0]}`; 
      }else
        return `${this.month[Number(darray[1]) - 1]} ${darray[2]}, ${darray[0]}`; 
    }
  else
    return "";
}


deleteorder(){
  this.dataservice.deleteorder(this.getid);
  this.vieworderhide();
}
  
  ngOnInit(){
   this.getorderList()
   this.getproducts()
   this.getmanufactures()
  }

}
