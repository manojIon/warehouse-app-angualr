import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { DeliverydateService } from 'src/services/deliverydate.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  @ViewChild("mdneworder")mdneworder:any = ElementRef;
  @ViewChild("mdvieworder")mdvieworder:any = ElementRef;
  @ViewChild("deleteproductmodel")mddelorder:any = ElementRef;
  p: number = 1;

  ordersList:any = [];
  productnameList:any = [];
  supplyList:any = [];
  ordertypeList:any = [];

  // filters
  searchOrderby:any = "";
  searchstatus:any = "";
  searchDate:any = "";
  searchsupp:any = "";

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

  priority = [
    {name:"High"},
    {name: "Moderate"},
    {name: "Low"},
  ]

 
 resdata:any

 month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

 modifiedDate:any;

   modDate(d:any){
     let datepipeval = this.datefilter.transform(d, 'mediumDate');
     this.modifiedDate = datepipeval;
   }


  getordersList() {
    let getorders = this.dataservice.getordersList()
    getorders.subscribe(
    res => {
      this.ordersList = res;

      let todayDate = new Date().getDate();
    //May 25, 2022
      this.ordersList.map((e:any) => {
        let gotdata = `${e.delievertdate.substring(e.delievertdate.length - 4)}, ${this.month.indexOf(e.delievertdate.substring(0,3)) + 1}, ${e.delievertdate.substring(4,6)}`;
        if(todayDate > new Date(gotdata).getDate()){
          let record :any = {};
          record['status'] = this.orderStatus[1].name
          this.dataservice.updateorder(e.ids, record);
        }
      })
    },
    error => {
      console.log(error);
    }
    
  )

  }

  getproducttype(){
    this.dataservice.getproductnameList().subscribe(
      response => {
        this.productnameList = response.map(e => {
            let payload: any = e.payload.doc.data();
            return {
              id: e.payload.doc.id,
              name: payload['name']
            }
        })
        //console.log(this.productnameList);
    })
    
  }

  getmanufacture(){
    this.dataservice.getmanufactureList().subscribe(
      response => {
        this.supplyList = response.map(e => {
            let payload: any = e.payload.doc.data();
            return {
              id: e.payload.doc.id,
              name: payload['name']
            }
        })
        //console.log(this.supplyList);
    })
    
  }

  constructor(private dataservice:DataService, private fb:FormBuilder, private datefilter:DatePipe, private deldateService:DeliverydateService) { }

  addorderForm = this.fb.group({
    ordertype: ['', Validators.required],
    units:['', Validators.required],
    orderby:['', Validators.required],
    supplier:['', Validators.required],
    priority:['', Validators.required],
    comments:['', [Validators.minLength(1), Validators.maxLength(100)]]
  })

  deldate:any;
  availableunits:number = 0;

  productsList:any = [];
  gotmname:any; 
  gotpname:any;

  getproductInfo() {
    this.dataservice.getproductsList().subscribe(
      response => {
        this.productsList = response.map(e => {
          let otherinfo: any = e.payload.doc;
          return {id: otherinfo.id, ...otherinfo.data()};
        })
        // console.log(this.productsList);
      }
    )
    
  } 



  addorderDetails(){
     let record: any = {};
    // record['orderdate'] = `${month[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`;
    record['orderdate'] = this.datefilter.transform(new Date(), "mediumDate")
    // record['delievertdate'] = this.datefilter.transform(new Date().setDate(new Date().getDate() + 7), "mediumDate")
    record['delievertdate'] = this.deldateService.getdate();
    record['productname'] =  this.addorderForm.value.ordertype;
    record['manufacture'] =  this.addorderForm.value.supplier;
    record['orderby'] =  this.addorderForm.value.orderby;
    record['units'] =  this.addorderForm.value.units;
    record['priority'] =  this.addorderForm.value.priority;
    record['comments'] =  this.addorderForm.value.comments;  
    record['status'] =  this.orderStatus[0].name;

    this.dataservice.addneworder().add(record);

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
  viewstatus:string = "";
  vieworderdate:string  = "";
  viewdeldate:any;

  getid:string = "";

  vieworderDetails(id:any){
    //console.log(id)
    this.getid = id
    this.viewordershow();
    this.ordersList.map((e: any) => {
      if (e.ids === id) {
        let productid = this.ordersList[this.ordersList.indexOf(e)];
        let deldateformat = productid.delievertdate.split(' ');
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
        this.viewstatus = productid.status
        this.vieworderdate = productid.orderdate
      }
    })
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


  updateorder(){
    let record:any = {};

    record['orderdate'] = this.vieworderdate;
    record['delievertdate'] = this.moddeldate(this.viewdeldate);
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



  
  deleteproductname:any;
  deletemanufacterer:any;
  deleteorderdate:any;
  deleteorderby:any;

  deleteproductdetailshide(){
    this.mddelorder.nativeElement.style.display = "none";
  }

  deleteproductdetailsshow(){
    this.mddelorder.nativeElement.style.display = "block";

    this.ordersList.map((e:any) => {
      console.log(e, e.ids)
      if(this.getid == e.ids){
        this.deleteorderby = e.orderby;
        this.deleteorderdate = e.orderdate;
        this.deletemanufacterer = e.manufacture;
        this.deleteproductname = e.productname;
      }
    })
  }

  deleteproductdetailsconfirm(){
    this.dataservice.deleteorder(this.getid);
    this.vieworderhide();
    this.deleteproductdetailshide();
  }

  // Mar 20, 2022 -> Mar 27, 2022
 
  ngOnInit(){
    this.getproducttype();
    this.getmanufacture();
    this.getordersList();
    this.getproductInfo();

    //console.log(`the deldate is ${new Date().getMonth()} ${new Date().getDate() + 7}, ${new Date().getFullYear()}`);
  }

}


