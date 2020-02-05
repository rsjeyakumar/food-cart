import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodCartService {
  showAlert;
  loginAPI = 'http://10.117.189.28:8085/foodie/login';
  getAllVendorAPI = 'http://10.117.189.227:8085/foodie/vendors';
  menuList = 'http://10.117.189.28:8085/foodie/vendors';



  constructor(private http: HttpClient) {
  }

  /* Http Headers */
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  /*
  * @param data
  * Validate Login API
  * POST Method
  * Type Object
  */
  checkLogin(data): Observable<any> {
    return this.http.post(this.loginAPI, data, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
   * @param data
   * Validate Login API
   * POST Method
   * Type Object
   */
  getMenuList(vendorid): Observable<any> {
    return this.http.get(this.menuList + '/' + vendorid, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
    * @param data
    * Get All Vendors
    * GET Method
    * Type Object
    */
  getAllVendors(): Observable<any> {
    return this.http.get(this.getAllVendorAPI, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  /*
     * @param error
     * Error Handling
     */
  private errorHandler(error) {
    let errorMessage = '';
    this.showAlert = {};
    if (error.error instanceof ErrorEvent) {
      /* Get client-side error */
      errorMessage = error.error.message;
    } else {
      /* Get server-side error */
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(error.error.message);
    this.showAlert = this.modalConfig(error.error.message ? error.error.message : 'Network Error', true);
    return throwError(errorMessage);
  }
  /*
   * @param No Param
   * Check user is valid or not
   * Type boolean
   */
  public validUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * @param message, modal
   * Set Modal Properties
   */
  public modalConfig(mesg, modal) {
    return {
      // header: head,
      message: mesg,
      modalShow: modal
    };
  }
}
