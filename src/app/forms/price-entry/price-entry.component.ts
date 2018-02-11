import { Component, OnInit } from '@angular/core';
import { DbServicesService } from '../../services/db-services.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PriceList, ItemEntry, ItemPrice } from '../../pricebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-entry',
  templateUrl: './price-entry.component.html',
  styleUrls: ['./price-entry.component.scss']
})
export class PriceEntryComponent implements OnInit {
  $item: Observable<any[]>;
  // key:any;
  items: Promise<any>;
  searhForm: FormGroup;
  orderForm: FormGroup;
  itemlist:ItemEntry[];
  priceset:PriceList;

  constructor(private dbser: DbServicesService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.createSearchForm();
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([])
    });
    this.searhForm = this.formBuilder.group({
      pricedate: '',
      pricegrp: '',
    });
  }
  OnLoadPrice(){
    this.itemlist = this.dbser.getItemEntryList();  
    let pdate = this.searhForm.get('pricedate').value;
    let group = this.searhForm.get('pricegrp').value;
    let fitems = this.orderForm.get('items') as FormArray;
    while (fitems.length !== 0) {
        fitems.removeAt(0);
      }
    
    this.dbser.getPriceSet(pdate,group).subscribe(x=>{    
       if (x.length===0){
          this.priceset=null;
          this.loadEntryFromItemlist(fitems);
          return;
       }
        x.map(m=>{
          this.priceset =m;
          this.priceset.item.forEach(itm=>{
              let found = this.itemlist.find(entry=> entry.name===itm.name);
              if (found){
                  found.priceA= itm.priceA;
                  found.priceB= itm.priceB;
              }
            // fitems.push(this.createItem(itm));
           });
           this.itemlist.forEach(entry=>{
            fitems.push(this.createItem(entry));
           });
        })
    });
  }

  loadEntryFromItemlist(fitems:FormArray){
    this.itemlist.forEach(entry=>{
      fitems.push(this.createItem(entry));
     });
  }
  createSearchForm() {
    this.searhForm = this.formBuilder.group({
      pricedate: new FormControl(this.getTodayDate()),
      pricegrp: 'A'
    });
  }

  getTodayDate():string {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let ds ="";
    let ms=""; 
    if (dd < 10) {
      ds = '0' + dd
    }else{
      ds=''+dd;
    }

    if (mm < 10) {
      ms = '0' + mm
    }else{
      ms=''+mm;
    }
    console.log(ds+'-'+ms+'-'+yyyy);
    return ds+'-'+ms+'-'+yyyy;
  }

  createItem(itm): FormGroup {
    return this.formBuilder.group({
      name: itm.name,
      description: itm.desc,
      uom: itm.uom,
      priceA: itm.priceA,
      priceB: itm.priceB
    });
  }
  
  OnSave(){
    let itmprices:ItemPrice[]=[];
    let fitems = this.orderForm.get('items') as FormArray;
    for(let i=0;i<fitems.length;i++){
      let price:ItemPrice= new ItemPrice();
      price.name= fitems.at(i).get('name').value;
      price.priceA =fitems.at(i).get('priceA').value;
      price.priceB =fitems.at(i).get('priceB').value;
      itmprices.push(price);     
    }
    if (this.priceset!=null){
      this.priceset.item = itmprices;
      this.dbser.UpdatePriceSet(this.priceset).then(x=>{
        this.priceset=null;
        this.clearFormArray();
      }).catch(err=>{
         console.log(err);
      });
    }else {
      let pdate = this.searhForm.get('pricedate').value;
      let group = this.searhForm.get('pricegrp').value;
      this.priceset = new PriceList();
      this.priceset.date =pdate+"/"+group;
      this.priceset.item = itmprices;
      this.dbser.InsertPriceSet(this.priceset).then(ref=>{
        ref.push(this.priceset).then(ref=>{
          this.priceset=null;
          this.clearFormArray();
        })      
      });
    }
    
  }
  clearFormArray(){
    //console.log('clear');
    let fitems = this.orderForm.get('items') as FormArray;
    while (fitems.length !== 0) {
        fitems.removeAt(0);
      
    }
    fitems = new FormArray([]);
    this.orderForm.reset();
  }
  OnCancel(){
    this.router.navigate(['/main']);
  }
  get formData() { return <FormArray>this.orderForm.get('items'); }
}
