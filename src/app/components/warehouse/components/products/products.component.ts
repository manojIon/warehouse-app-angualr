import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('addproductmodel') addproductModel: any = ElementRef;
  @ViewChild('viewproductmodel') viewproductModel: any = ElementRef;
  @ViewChild('updateproductmodel') updateproductmodel:any = ElementRef;
  @ViewChild('deleteproductmodel') deleteproductmodel:any = ElementRef;

  p: number = 1;

  searchProduct: any = '';

  productsList: any = [];

  producttypeList: any = [];

  productnameList: any = [];

isproductThere:any = [];
ismanufactureThere:any = [];

  constructor(private dataservice: DataService, private fb: FormBuilder) { }


  // get products list
  getproductInfo() {
    this.dataservice.getproductsList().subscribe(
      response => {
        this.productsList = response.map(e => {
          let otherinfo: any = e.payload.doc.data();
          return {
            id: e.payload.doc.id,
            productname: otherinfo['productname'],
            manufacture: otherinfo['manufacture'],
            currentUnit: otherinfo['currentUnit'],
            base: otherinfo['base'],
            comments: otherinfo['comments']
          };
        }
   )

        // console.log("productslist", this.productsList);



        // product names list
        this.producttypeList = response.map(e => {
          let getpayload: any = e.payload.doc.data();
          return { name: getpayload['productname'] }
        })


        // add productname;




        // final product names dropdown list
        const dropdown = this.producttypeList.filter((e: any) => {
          if (this.productnameList.find((i: any) => e.name === i.name)) {
            return false
          }
          return this.productnameList.push(e);

        })

        this.productnameList = dropdown;

        //this.dataservice.getproductnameList(this.productnameList);
      },
      (error)=> {
        console.log('The error is' + error);
      })

  }


  // Add new product form
  addproductform = this.fb.group({
    productname: ['', Validators.required],
    manufacture: ['', Validators.required],
    base: [Validators.required],
    currentUnit: ['', Validators.required],
    comments: ['', [Validators.minLength(5), Validators.maxLength(300)]]
  })


  addproductDetails() {
    let record: any = {};

    record['productname'] = this.addproductform.value.productname;
    record['manufacture'] = this.addproductform.value.manufacture;
    record['base'] = this.addproductform.value.base;
    record['currentUnit'] = this.addproductform.value.currentUnit;
    record['comments'] = this.addproductform.value.comments;

    this.dataservice.addproduct(record);

    let productTypeList:any = {};
    let manufactureList:any = {};

    productTypeList['name'] = this.addproductform.value.productname;
    manufactureList['name'] = this.addproductform.value.manufacture;


    //console.log(this.productsList) ismanufactureThere;
    this.isproductThere = this.productsList.map((e:any) => {
                          return e.productname
                        });

    this.ismanufactureThere = this.productsList.map((e:any) => {
                              return e.manufacture
                            });                

                    console.log(this.ismanufactureThere)                

    // update productname list
    if(!this.isproductThere.includes(this.addproductform.value.productname)){
      //console.log(this.addproductform.value.productname)
      this.dataservice.updateproductnameList(productTypeList);
    }

    // update manufacture list
    if(!this.ismanufactureThere.includes(this.addproductform.value.manufacture)){
      console.log(this.addproductform.value.manufacture)
      this.dataservice.updatemanufactureList(manufactureList);
    }
    

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
  viewbaseunits: number | undefined;
  viewcurrentunits: number | undefined;
  viewcomments: string = "";

  viewproduct(id: string) {

    this.productsList.map((e: any) => {
      if (e.id === id) {
        let productid = this.productsList[this.productsList.indexOf(e)]
        //console.log(productid, productid.productname);

        this.viewproductname = productid.productname;
        this.viewcompanyname = productid.manufacture;
        this.viewbaseunits = productid.base;
        this.viewcurrentunits = productid.currentUnit;
        this.viewcomments = productid.comments;
      }
    })
    this.viewproductshow();
  }

// update product details

updateproductname: string = "";
updatecompanyname: string = "";
updatebaseunits: number | undefined;
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
      this.updatebaseunits = productid.base;
      this.updatecurrentunits = productid.currentUnit;
      this.updatecomments = productid.comments;

    }
  })

  this.updateproductshow();

  // let record:any = {};
  // record["productname"] = this.updateproductname,
  // record["manufacture"] = this.updatecompanyname,
  // record["base"] = this.updatebaseunits,
  // record["currentUnit"] = this.updatecurrentunits,
  // record["comments"] = this.updatecomments,

  // this.dataservice.updateproduct(recordID, record);
    
}


updateproductdetails(){
  let record:any = {};
  record["productname"] = this.updateproductname,
  record["manufacture"] = this.updatecompanyname,
  record["base"] = this.updatebaseunits,
  record["currentUnit"] = this.updatecurrentunits,
  record["comments"] = this.updatecomments,

  this.dataservice.updateproduct(this.getrecordID, record);

  this.updateproducthide();
}




  ngOnInit() {
    this.getproductInfo();
  }

}
