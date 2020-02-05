import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import { VendorListResponse } from '../../models/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loader = false;
  vendorList: VendorListResponse;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService,
    private elementRef: ElementRef
  ) {}

  getAllVendors() {
    this.loader = true;
    this.foodService.getAllVendors().subscribe(res => {
      this.loader = false;
      this.vendorList = res;
    },
      error => {
        this.loader = false;
      });
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
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
