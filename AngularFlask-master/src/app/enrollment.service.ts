import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from "./user";
import {catchError} from "rxjs/operators";
import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  _url='http://127.0.0.1:5000/employeepost/';
  constructor(private _http:HttpClient) { }
  enroll(user:User){
    return this._http.post<any>(this._url,user)
      .pipe(catchError(this.errorHandler))
  }
  errorHandler(error:HttpErrorResponse){
    return throwError(error);
  }
}
