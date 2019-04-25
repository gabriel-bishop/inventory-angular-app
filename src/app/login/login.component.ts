import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router,
              private service: DbService) { }

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


  loginUser() {
    let user = {username: this.username, password: this.password};
    this.service.login(user).subscribe(res => {
      console.log(res);
      if(!isNullOrUndefined(res)){
        this.router.navigate(['/']);
      }else{
        alert("Unable to login with those credentials.")
      }
    })
  }

  navToRegister(){
    this.router.navigate(['/register'])
  }

}
