import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ShopdataService {

  private ordersData:BehaviorSubject<any> = new BehaviorSubject<any>([]);

  orderinfo:Observable<any> = this.ordersData.asObservable()

  sendData(data:any){
     this.ordersData.next(data)
  }

  constructor(private db: AngularFirestore) { }

  // Shop orders details
  getshoporders() {
    return this.db.collection("shoporders").snapshotChanges().pipe(
      
      map(
        
        order => {
            return order.map((data: any) => {
              return { id: data.payload.doc.id, ...data.payload.doc.data() }
            })
      })
    )
  }


  getproducts(){
   return this.db.collection("productNames").snapshotChanges().pipe(
      map(
        data => {
          return data.map((d:any) => {
            return {id: d.payload.doc.id, ...d.payload.doc.data()}
          })
        }
      )
    )
  }


  getmanufactures() {
    return this.db.collection("manufactureNames").snapshotChanges().pipe(
      map(
        data => {
          return data.map((d: any) => {
            return { id: d.payload.doc.id, ...d.payload.doc.data() }
          })
        }
      )
    )
  }


addorder(){
    return this.db.collection("shoporders")
 }

updateorder(recordId:any, record:any){
  return this.db.doc("shoporders/" + recordId).update(record);
}

deleteorder(recordId:any){
 return this.db.doc("shoporders/" + recordId).delete();
}


//Shop inventory details

getinventory(){
  return this.db.collection("shopproducts").snapshotChanges().pipe(
    map(
      order => {
          return order.map((data: any) => {
            return { id: data.payload.doc.id, ...data.payload.doc.data() }
          })
    })
  )
}

 removeproduct(id: any) {
  return this.db.doc('shopproducts/' + id).delete();
 }

 addproduct(record:any){
   return this.db.collection('shopproducts').add(record);
 }

 updateproduct(recordID:any, record:any){
   return this.db.doc('shopproducts/' + recordID).update(record);
 }

}
