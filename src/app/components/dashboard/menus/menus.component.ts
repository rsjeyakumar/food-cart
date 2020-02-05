import { Component, OnInit } from '@angular/core';
import { FoodCartService } from './../../../services/food-cart.service';
import { MenuList,MenuListResposne } from '../../../models/models';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  incrementer = 1;
  menuItems;
  
  constructor(private foodServices: FoodCartService) { }

  ngOnInit() {
    this.getVendorMenus();
  }

  // addQuentity() {
  //   this.incrementer = 1;
  // }
  // decress() {
  //  this.incrementer--;
  //  alert(this.incrementer);
  // }
  // incress() {
  //   this.incrementer++;
  //   alert(this.incrementer);
  // }

  getVendorMenus() {
    this.foodServices.getMenuList(1).subscribe(
      (res: MenuListResposne) => {
        this.menuItems = res.menuList;
      }
    );
  }

}
