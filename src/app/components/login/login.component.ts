import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../services/food-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader: false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) {}

  /*
  * @param
  * Get login form controll access
  */
 get login() { return this.loginForm.controls; }

 /*
  * @param Login Validate
  * Validate login form with credentials
  * @input sapId and password
  */
 validateLogin() {
  if (this.loginForm.valid) {
    const postObj = {
      mobileNumber: this.loginForm.value.mobileNumber,
      password: this.loginForm.value.password
    };
    // tslint:disable-next-line: deprecation
    this.foodService.checkLogin(postObj).subscribe(user => {
      console.log(user);
      if (user) {
        const userDetails = {
          customerName: user.userName,
          customerId: user.userId,
          role: user.role
        };
        if (user.role === 'Customer') {
          this.router.navigate(['/vendors']);
        }
        if (user.role === 'Admin') {
          this.router.navigate(['/admin']);
        }
        sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
        this.loader = false;
      }
    }, error => {
      this.loader = false;
    });
  }
}
 /*
  * @param create form
  * Create form group object for login form
  */
 createForm() {
   this.loginForm = this.formBuilder.group({
    mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', Validators.required]
   });
 }

  ngOnInit() {
    this.createForm();
  }

}
