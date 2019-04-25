import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId: any;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  transactions: any;

  constructor(private router: Router,
              private service: DbService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.service.findCurrentUser()
      .subscribe(res => {
          if (isNullOrUndefined(res)) {
            this.router.navigate(['/login']);
          }
          this.user = res;
          this.userId = this.user._id;
          this.email = this.user['email'];
          this.username = this.user.username;
          this.password = this.user.password;
          this.firstName = this.user['firstName'];
          this.lastName = this.user['lastName'];
          this.transactions = this.user.transactions;
        }
      );
  }

  updateUser() {
    const user = {
      _id: this.userId,
      email: this.email,
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      transactions: this.transactions
    };

    this.service.updateUser(this.userId, user).subscribe(res => {
      console.log(res);
      this.getCurrentUser();
      alert('Successfully updated your profile!');
    });
  }

  navToInventory() {
    this.router.navigate(['/inventory']);
  }

  logoutUser() {
    this.service.logout().subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);
    });

  }

}
