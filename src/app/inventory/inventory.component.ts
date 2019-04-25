import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loggedIn: boolean;
  users: any;
  allItems: any;
  displayItems: any;
  itemsPerPage: number;
  sorted: boolean;


  constructor(private router: Router,
              private service: DbService) {
    this.loggedIn = false;

  }

  ngOnInit() {
    this.getCurrentUser();
    this.fetchUsers();
    this.fillInventory();
  }

  fillInventory(){
    this.allItems = []
    this.service.findAllProducts().subscribe(res => {
      const entries = Object.entries(res);

      for (let [x, product] of entries) {
        this.allItems.push(product);
      }
    })
  }

  getCurrentUser() {
    this.service.findCurrentUser()
      .subscribe(res => {
          if (!isNullOrUndefined(res)) {
            this.loggedIn = true;
          }
        }
      );
  }


  fetchUsers(){
    // this.users=
  }

  navToProfile(){
    this.router.navigate(['profile'])
  }

  navToScan(){
    this.router.navigate(['scan'])
  }

}
