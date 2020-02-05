import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loader: false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService,
    private elementRef: ElementRef
  ) {}


  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right bottom, #cfcbc9 ,#ff6200,#ff6200,#cfcbc9) fixed center';
    /* Check whether login/not */
    // if (!this.foodService.validUser()) {
    //   this.router.navigate(['/login']);
    // } else {
    //   this.router.navigate(['/dashboard']);
    // }
  }

}
