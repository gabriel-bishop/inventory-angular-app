import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {isNullOrUndefined} from 'util';

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
  selectedUser: any;
  selectedItems: any;


  constructor(private router: Router,
              private service: DbService) {

  }

  ngOnInit() {
    this.loggedIn = false;

    this.getCurrentUser();
    this.fetchUsers();
    this.fillInventory();
  }

  fillInventory() {
    this.allItems = [];
    this.selectedItems = [];

    this.service.findAllProducts().subscribe(res => {
      let keys = Object.keys(res);

      for (let product in keys) {
        this.allItems.push(res[product]);
        this.selectedItems.push(res[product]);

      }
      console.log(this.selectedItems);
    });

  }

  getCurrentUser() {
    this.service.findCurrentUser()
      .subscribe(res => {
          if (!isNullOrUndefined(res)) {
            this.loggedIn = true;
            console.log("is logged in")
          }
        }
      );
  }


  fetchUsers() {
    this.users = [];
    this.service.findAllUsers().subscribe(res => {
        let entries = Object.entries(res);

        for (let [x, user] of entries) {
          this.users.push(user);
        }

        // if(this.users.length > 0){
        //   this.selectedUser = this.users[0]._id
        // }
      }
    );
  }

  navToProfile() {
    this.router.navigate(['profile']);
  }

  navToScan() {
    this.router.navigate(['scan']);
  }

  navToProduct(pid) {
    this.router.navigate(['product/' + pid]);
  }

  filter(){

    if(this.selectedUser == "none"){
      this.selectedItems = this.allItems;
      return;
    }
    console.log("filtering")
    this.selectedItems = [];

    let keys = Object.keys(this.allItems);
    for (let product in keys) {
      console.log(this.allItems[product])
      console.log(this.selectedUser)

      if(this.allItems[product].userId == this.selectedUser){
        this.selectedItems.push(this.allItems[product]);
      }
    }
  }

}
