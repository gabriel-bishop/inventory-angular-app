import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from '../services/db.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  verifyPassword: string;

  constructor(private router: Router,
              private service: DbService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.service.findCurrentUser()
      .subscribe(res => {
          if (!isNullOrUndefined(res)) {
            this.router.navigate(['/']);
          }
        }
      );
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  registerUser() {
    if(this.password != this.verifyPassword){
      alert("Passwords don't match.")
      return;
    }

    let user = {
      username: this.username,
      password: this.password,
      _id: (new Date().getTime() / 10000)
    };

    this.service.register(user).subscribe(res => {
        if (isNullOrUndefined(res)) {
          alert('Invalid registration.');
        } else {
          this.router.navigate([''])
        }
      }
    );
  }

}
