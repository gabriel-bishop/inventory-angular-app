import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private router: Router,
              private service: DbService) {
  }

  ngOnInit() {
    this.isLoggedIn = false;
    this.getCurrentUser();

  }

  getCurrentUser() {
    this.service.findCurrentUser()
      .subscribe(res => {
          if (!isNullOrUndefined(res)) {
            this.isLoggedIn = true;
          }
        }
      );
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  navToRegister() {
    this.router.navigate(['/register']);
  }

  navToInventory() {
    this.router.navigate(['/inventory']);
  }

  navToProfile() {
    this.router.navigate(['/profile']);
  }

}
