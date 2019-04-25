import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navToInventory(){
    this.router.navigate(['/inventory'])
  }

}

