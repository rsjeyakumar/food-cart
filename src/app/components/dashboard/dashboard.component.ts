import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import { VendorListResponse } from '../../models/models';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loader = false;
  vendorList: VendorListResponse;
  display = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) {}

   vendorDetails() {
    this.router.navigate(['/vendors/menus']);
  }

  showAllVendors() {
    this.loader = true;
    this.foodService.getAllVendors().subscribe(res => {
      console.log(res);
      this.loader = false;
      this.vendorList = res.listofvendors;
    },
      error => {
        this.loader = false;
      });
  }

  ngOnInit() {
    this.showAllVendors();
    /* Check whether login/not */
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.foodService.validUser()) {
       this.router.navigate(['/login']);
     } else {
      if (user.role === 'Admin') {
        this.router.navigate(['/admin']);
       } else {
        this.router.navigate(['/vendors']);
       }
     }
  }

}
