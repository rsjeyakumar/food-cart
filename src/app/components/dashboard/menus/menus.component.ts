import { Component, OnInit } from '@angular/core';
import { FoodCartService } from './../../../services/food-cart.service';
import { MenuList, MenuListResposne } from '../../../models/models';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Orders, OrderMenu } from './../../../models/models';

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
  placeorder: Orders;
  cart = [];
  constructor(
    private foodServices: FoodCartService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  changeQuantity(menu, e) {
    let obj = this.cart.findIndex(o => o.menuId === menu.menuId);
    if (obj !== -1) {
      this.cart[obj].quantity = e.target.value;
      this.cart[obj].quantityPrice = this.cart[obj].quantity * this.cart[obj].menuPrice;
    }
    this.subTotal();
  }

  addToCart(menu) {
    const addmenu = menu;
    let obj;

    // tslint:disable-next-line: align
    obj = this.cart.findIndex(o => o.menuId === addmenu.menuId);
    if (obj !== -1) {
      this.cart[obj].quantity += 1;
      this.cart[obj].quantityPrice = this.cart[obj].quantity * this.cart[obj].menuPrice;
    } else {
      addmenu.quantity = 1;
      addmenu.quantityPrice = addmenu.menuPrice;
      this.cart.push(addmenu);
    }
    this.loader = true;
    this.subTotal();
  }

  removeCart(menuId) {
    const obj = this.cart.find(o => o.menuId === menuId);
    if (obj) {
      this.cart.forEach(
        (itme, index) => {
          if (itme.menuId === menuId) {
            this.cart.splice(index, 1);
            this.subtotal = this.subtotal - itme.menuPrice;
          }
        }
      );
    }
  }

  placeOrder() {
    const menuList = this.cart;
    console.log(menuList);
  }

  // placeOrder() {

  //   let menuList =this.cart;

  //   menuList.forEach(
  //     (item) => {
  //       menuList.quantity=menuList.quantityPrice;
  //       delete menuList.menuName;
  //       delete menuList.menuPrice;
  //       delete menuList.quantityPrice;
  //     }
  //   );

  //   this.placeorder = {
  //     vendorId: 6,
  //     menuList: menuList,
  //     paymentType: 'Paytem'
  //   };
  //   this.foodServices.payment(this.placeOrder, 4).subscribe(
  //     res => {

  //     }
  //   )
  // }

  subTotal() {
    this.subtotal = this.cart.reduce((total, currentValue) => {
      return total + currentValue.quantityPrice;
    }, 0);

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
      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/vendors/menus']);
      }
    }
    this.createForm();
  }

  getVendorMenus() {
    const vendorId = sessionStorage.getItem('currentVendor');
    this.foodServices.getMenuList(vendorId).subscribe(
      (res: MenuListResposne) => {
        this.menuItems = res.menuList;
      }
    );
  }

}
