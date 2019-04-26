import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  pid: number;
  sku: any;
  description: any;
  quantity: any;
  userId: any;
  image: any;
  dateRaw: any;
  fields: any;
  productFound: boolean;
  loggedInUser: number;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: DbService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCurrentUser();
      this.productFound = false;
      this.sku = params['sku'];
      this.findProductDetails();

    })};

  getCurrentUser() {
    this.service.findCurrentUser()
      .subscribe(res => {
          if (isNullOrUndefined(res)) {
            this.router.navigate(['/login'])
          } else {
            this.loggedInUser = res['_id'];
            console.log(this.loggedInUser)
          }
        }
      );
  }

  findProductDetails(){

    this.service.findProductBySku(this.sku).subscribe(res => {
      if(isNullOrUndefined(res)){
        this.productFound = false;
        this.quantity = 0;
        this.description = "Enter a description";
        this.dateRaw = new Date().getTime();
        return;
      }
      this.productFound = true;
      this.pid = res['_id'];
      this.sku = res['sku'];
      this.description = res['description'];
      this.quantity = res['quantity'];
      this.userId = res['userId'];
      this.image = res['image'];
      this.dateRaw = new Date(res['date']);
      this.fields = res['fields'];
    })

  }

  decrement(){
    this.quantity -= 1;
  }

  increment(){
    this.quantity += 1;
  }

  getDate(){
    let date = new Date(this.dateRaw);
    return date.getMonth() +"/" + date.getDate() + "/" + date.getUTCFullYear()
  }

  update() {

    let newDate = new Date(this.dateRaw);
    const product = {
      _id: this.pid,
      sku: this.sku,
      description: this.description,
      quantity: this.quantity,
      userId: this.userId,
      date: newDate.getTime(),
      fields: this.fields,
      image: this.image
    };

    this.service.updateProduct(this.sku, product).subscribe(res => {
      console.log(res);
      this.findProductDetails();
      alert("Product updated!");
    });

  }

  add() {

    let newDate = new Date(this.dateRaw);
    const product = {
      _id: (new Date().getTime() / 10000),
      sku: this.sku,
      description: this.description,
      quantity: this.quantity,
      userId: this.loggedInUser['_id'],
      date: newDate.getTime(),
      fields: {},
      image: ""
    };

    this.service.createProduct(product).subscribe(res => {
      console.log(res);
    });

  }

}
