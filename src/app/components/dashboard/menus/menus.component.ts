import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  incrementer = 0;
  constructor() { }

  ngOnInit() {
  }

  addQuentity() {
    this.incrementer = 1;
  }
  decress() {
   this.incrementer--;
   alert(this.incrementer);
  }
  incress() {
    this.incrementer++;
    alert(this.incrementer);
  }

}
