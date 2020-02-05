import { Component, OnInit } from '@angular/core';
import { FoodCartService } from './../../../services/food-cart.service';
import { MenuList, MenuListResposne } from '../../../models/models';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  incrementer = 1;
  menuItems;
  cartItems;
  loader = false;
  totalPay: number;
  netPay: number;
  subtotal = 0;
  checkoutForm: FormGroup;
  cart = [];
  constructor(
    private foodServices: FoodCartService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  addToCart(menu) {
    const addmenu = menu;
    let obj = [];
    
    // tslint:disable-next-line: align
    obj = this.cart.find(o => o.menuId === addmenu.menuId);
    if (obj) {
      // this.cart.forEach(
      //   (itme) => {
      //     if (itme.menuId === addmenu.menuId) {
      //       itme.quantity = itme.quantity + 1;
      //       itme.menuPrice = itme.menuPrice * itme.quantity;
      //       this.subtotal = this.subtotal + itme.menuPrice;
      //       console.log(this.subtotal+"subtotal===");
      //       console.log(menu.menuPrice+"currnt price===");
      //     }
      //   }
      // );
      for (let i = 0; i <= this.cart.length; i++) {
        if (this.cart[i].menuId === addmenu.menuId){
          this.cart[i].quantity = this.cart[i].quantity + 1;
          this.cart[i].menuPrice = this.cart[i].menuPrice * this.cart[i].quantity;
          this.subtotal = this.subtotal + this.cart[i].menuPrice;
        }
      }

    } else {
      addmenu.quantity = 1;
      this.subtotal = this.subtotal + addmenu.menuPrice;
      this.cart.push(addmenu);
    }
    this.loader = true;
  }

  removeCart(menuId) {
    const obj = this.cart.find(o => o.menuId === menuId);
    if (obj) {
      this.cart.forEach(
        (itme, index) => {
          if (itme.menuId === menuId) {
            this.cart.splice(index, 1);
            console.log(this.subtotal+"subtotal===");
            console.log(itme.menuPrice+"currnt price===");
            this.subtotal = this.subtotal - itme.menuPrice;
          }
        }
      );
    }
  }

  showMyCart() {

  }



  /*
 * @param create form
 * Create form group object for login form
 */
  createForm() {
    this.checkoutForm = this.formBuilder.group({
    });
  }
  ngOnInit() {
    this.getVendorMenus();
    /* Check whether login/not */
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.foodServices.validUser()) {
      this.router.navigate(['/login']);
    } else {
      if (user.role === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/vendors/menus']);
      }
    }
    this.createForm();
  }

  getVendorMenus() {
    this.foodServices.getMenuList(1).subscribe(
      (res: MenuListResposne) => {
        this.menuItems = res.menuList;
      }
    );
  }

}
