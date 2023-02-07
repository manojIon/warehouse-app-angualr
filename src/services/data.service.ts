import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

export interface Order{
  id: string,
  delievertdate:string,
  manufacture:string,
  units:number,
  orderby:string,
  orderdate:string,
  priority:string,
  status:string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http : HttpClient, private db:AngularFirestore) { }

 menuList: string = "";
 
 //login API
  loginCredts() {
    return this.db.collection('login').valueChanges();
  } 

  // Products API
  getproductsList() {
    return this.db.collection("products").snapshotChanges();                                 
  } 

  removeproduct(id: any) {
   return this.db.doc('products/' + id).delete();
  }

  addproduct(record:any){
    return this.db.collection('products').add(record);
  }

  updateproduct(recordID:any, record:any){
    return this.db.doc('products/' + recordID).update(record);
  }

  getproductnameList(){
    return this.db.collection("productNames").snapshotChanges();
  }

  getmanufactureList(){
    return this.db.collection("manufactureNames").snapshotChanges();
  }

  updateproductnameList(record:any){
    this.db.collection("productNames").add(record);
  }

  updatemanufactureList(record:any){
    this.db.collection("manufactureNames").add(record);
  }

  

   //Orders List API
   getordersList():Observable<Order[]>{
    return this.db.collection("orders", ref => ref.orderBy("orderdate", "desc")).snapshotChanges()
      .pipe(map(
        //map transforms the Order = [ {id:'ddaad', data: {}}, {id:'sscsxc', data: {}}] to  an array [{id:'ddaad, deliever...}],
        order => {
        return order.map(d => {
          const data:any = d.payload.doc.data();
          const ids = d.payload.doc.id;
          return {ids, ...data}
        })
      })
    )
   }

   addneworder(){
     return this.db.collection("orders");
   } 
   
   updateorder(recordId:any, record:any){
     return this.db.doc("orders/" + recordId).update(record);
   }

   deleteorder(recordId:any){
    return this.db.doc("orders/" + recordId).delete();
  }

}


