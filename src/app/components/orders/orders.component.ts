import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import { VendorListResponse } from '../../models/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList;
  loader = false;
  vendorList: VendorListResponse;
  display = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) {}

  showMyOders() {
    this.loader = true;
    const userId = JSON.parse(sessionStorage.getItem('currentUser')).customerId;
    this.foodService.getMyOrders(userId).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.orderList = res.orderDetails;
    },
      error => {
        this.loader = false;
      });
  }

  ngOnInit() {
        /* Check whether login/not */
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!this.foodService.validUser()) {
           this.router.navigate(['/login']);
         } else {
          if (user.role === 'ADMIN') {
            this.router.navigate(['/admin']);
           } else {
            this.router.navigate(['/orders']);
           }
         }
        this.showMyOders();
  }

}
