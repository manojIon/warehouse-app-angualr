import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopdataService } from 'src/services/shopdata.service';


@Component({
  selector: 'app-shopinventory',
  templateUrl: './shopinventory.component.html',
  styleUrls: ['./shopinventory.component.scss']
})
export class ShopinventoryComponent implements OnInit {

  
  @ViewChild('addproductmodel') addproductModel: any = ElementRef;
  @ViewChild('viewproductmodel') viewproductModel: any = ElementRef;
  @ViewChild('updateproductmodel') updateproductmodel:any = ElementRef;
  @ViewChild('deleteproductmodel') deleteproductmodel:any = ElementRef;

  p: number = 1;

  searchProduct: any = '';
  productsList: any = [];
  productnameList: any = [];
  supplyList:any = [];

  constructor(private dataservice: ShopdataService, private fb: FormBuilder) { }


  // get products list
  getproductInfo() {
    this.dataservice.getinventory().subscribe(
      response => {
         this.productsList = response;
      }
    )
  } 

  getproductsNames(){
    this.dataservice.getproducts().subscribe(
      response => {
        this.productnameList = response;
      }
    )
  }

  getsuppliernames(){
    this.dataservice.getmanufactures().subscribe(
       response => {
         this.supplyList = response;
       }
    )
  }


  // Add new product form
  addproductform = this.fb.group({
    productname: ['', Validators.required],
    manufacture: ['', Validators.required],
    currentUnit: ['', Validators.required],
    comments: ['', [Validators.minLength(5), Validators.maxLength(300)]]
  })


  addproductDetails() {
    let record: any = {};

    record['productname'] = this.addproductform.value.productname;
    record['manufacture'] = this.addproductform.value.manufacture;
    record['currentUnits'] = this.addproductform.value.currentUnit;
    record['comments'] = this.addproductform.value.comments;

    this.dataservice.addproduct(record);
    
    this.addproductform.reset()
    this.addproducthide();
    
  }

  // add new product model
  addproductshow() {
    this.addproductModel.nativeElement.style.display = "block";
  }


  addproducthide() {
    this.addproductform.reset()
    this.addproductModel.nativeElement.style.display = "none";
  }

  //delete a product

  deleteproductdetailshide(){
    this.deleteproductmodel.nativeElement.style.display = "none";
  }

  deleteproductdetailsshow(){
    this.deleteproductmodel.nativeElement.style.display = "block";
  }

  deleteproductname:string | undefined;
  deletemanufacterer:string | undefined;
  getremoveid:any;

  removeProduct(id:any) {
    this.deleteproductdetailsshow();
    this.getremoveid = id;
    this.productsList.map((e: any) => {
      if (e.id === id) {
        let productid = this.productsList[this.productsList.indexOf(e)];
          this.deleteproductname = productid.productname;
          this.deletemanufacterer = productid.manufacture;
      }  
    })
  }

  deleteproductdetailsconfirm(){
    this.dataservice.removeproduct(this.getremoveid);
    this.deleteproductdetailshide();
  }

  //view product details model
  viewproductshow() {
    this.viewproductModel.nativeElement.style.display = "block";
  }

  viewproducthide() {
    this.viewproductModel.nativeElement.style.display = "none";
  }


  //view product details

  viewproductname: string = "";
  viewcompanyname: string = "";
  viewcurrentunits: number | undefined;
  viewcomments: string = "";

  viewproduct(id: string) {

    this.productsList.map((e: any) => {
      if (e.id === id) {
        let productid = this.productsList[this.productsList.indexOf(e)]
        //console.log(productid, productid.productname);

        this.viewproductname = productid.productname;
        this.viewcompanyname = productid.manufacture;
        this.viewcurrentunits = productid.currentUnits;
        this.viewcomments = productid.comments;
      }
    })
    this.viewproductshow();
  }

// update product details

updateproductname: string = "";
updatecompanyname: string = "";
updatecurrentunits: number | undefined;
updatecomments: string = "";

updateproducthide(){
  this.updateproductmodel.nativeElement.style.display = 'none';
}

updateproductshow(){
  this.updateproductmodel.nativeElement.style.display = 'block';
}

getrecordID:any;

updateproduct(recordID:any){

  this.getrecordID = recordID;

  this.productsList.map((e: any) => {
    if (e.id === recordID) {
      let productid = this.productsList[this.productsList.indexOf(e)]
      //console.log(productid, productid.productname);

      this.updateproductname = productid.productname;
      this.updatecompanyname = productid.manufacture;
      this.updatecurrentunits = productid.currentUnits;
      this.updatecomments = productid.comments;

    }
  })

  this.updateproductshow();
    
}


updateproductdetails(){
  let record:any = {};
  record["productname"] = this.updateproductname,
  record["manufacture"] = this.updatecompanyname,
  record["currentUnits"] = this.updatecurrentunits,
  record["comments"] = this.updatecomments,

  this.dataservice.updateproduct(this.getrecordID, record);

  this.updateproducthide();
}

  ngOnInit(){
    this.getproductInfo();
    this.getproductsNames();
    this.getsuppliernames();
  }

}
