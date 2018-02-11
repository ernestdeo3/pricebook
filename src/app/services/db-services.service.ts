import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ItemPrice, Item,PriceList, ItemEntry } from './../pricebook';


@Injectable()
export class DbServicesService {
  private masteritems:Item[];
  private prices: AngularFireList<any>;
  private price:PriceList = new PriceList();
  private pricesets: Observable<any[]>;
  

  constructor(private db: AngularFireDatabase) { 
    this.masteritems=[];
    this.prices = db.list('/');
    this.getItem('/items');
   // this.getItemOnce(this.masteritems);
   
  }
  
  getItem(listPath) {
    return this.db.list(listPath).valueChanges()
      .subscribe(x=>{
          x.map((item:Item)=>{
            let itm = new Item();
            itm.name= item.name;
            itm.desc= item.desc;
            itm.uom= item.uom;
            if (!this.masteritems.find(f=>f.name===item.name)){
              this.masteritems.push(itm);          
            };
        })
      });
   }
    
   getItemOnce(item:Item[]) {
    this.db.database.ref('/items').once('value')
    .then(function(snapshot){
        snapshot.val().map(x=>{
          let itm:Item = new Item();
          itm.name= x.name;
          itm.desc=x.desc;
          itm.uom= x.uom;
          item.push(itm);
          console.log(x); 
        })
    });  
   }
  
  getItemList(){
    return this.masteritems;
  }

  getItemEntryList():ItemEntry[] {
     let entrys:ItemEntry[]=[];
     console.log("mas "+this.masteritems.length);
     this.masteritems.forEach(x=>{
        let entry:ItemEntry = new ItemEntry();
            entry.desc= x.desc;
            entry.name= x.name;
            entry.uom= x.uom;
            entry.priceA=0.00;
            entry.priceB=0.00;
        entrys.push(entry);   
        console.log(x); 
     });
     console.log(entrys.length);
     return entrys;
  }
  getPriceSet(datestr:string,priceset:string) {
    const searchkey = datestr+"/"+priceset;
    let itemsRef = this.db.list('/',
           ref => ref.orderByChild('date')
                     .equalTo(searchkey)
                     .limitToFirst(1)
                     );
                     
    return itemsRef
          .snapshotChanges() 
          .map(changes => {
            return changes
                   .map(c => ({ 
                      $key: c.payload.key, ...c.payload.val() 
                    })
                  );
         }); 
  }

  UpdatePriceSet(price:PriceList){
    const key = price.$key;
    delete price.$key;
    console.log('update '+key);
    return this.prices.update(key,price);    
    
  }

  DeletePriceSet(price:PriceList){
    const key = price.$key;
    this.prices.remove(key);
  }
  
  InsertPriceSet(price:PriceList){
    console.log('insert');
    return this.prices.push(null);
    
   }
}
