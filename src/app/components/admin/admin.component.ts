import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  display = false;
  addVendor: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService,
    private elementRef: ElementRef
  ) { }

  getAllVendors() {
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

  addNewVendor() {
    this.display = true;
  }

  ngOnInit() {
    this.getAllVendors();
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    /* Check whether login/not */
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.foodService.validUser()) {
      this.router.navigate(['/login']);
    } else {
      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/vendors']);
      }
    }
    this.addVendor = this.formBuilder.group({
      vendorName: ['', Validators.required],
      vendorImage: ['', Validators.required],
      numberOfMenus: ['', Validators.required],
      menuDetails: new FormArray([])
    });
  }


  get f() { return this.addVendor.controls; }
  get t() { return this.f.menuDetails as FormArray; }


  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(this.formBuilder.group({
          menuName: ['', Validators.required],
          menuPrice: ['', [Validators.required]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  addVendormenu() {
    this.submitted = true;
    const postObj = this.addVendor.value;
    delete postObj.numberOfMenus;
    // stop here if form is invalid
    if (this.addVendor.invalid) {
      return;
    }
    this.foodService.addVendor(postObj).subscribe(
      () =>{
        alert('Vendor added successfully')
      }
    )
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(postObj, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.addVendor.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }

}
