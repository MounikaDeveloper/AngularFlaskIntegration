import { Component, OnInit } from '@angular/core';
import { RestService } from './Services/rest.service';
import {Employee} from './Employee';
import {User} from './user'
import {EnrollmentService} from "./enrollment.service";
import { RegistrationService } from './registration.service';
import {FormControl, FormGroup} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// @Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
  title = 'AngularFlask';
  stringifiedData: any;
  parsedJson: any;
  registrationForm=new FormGroup({id:new FormControl(''),
  name:new FormControl(''),
  email:new FormControl('')});
  //object data

  submitted=false;
  errorMsg='';
  userModel=new User(1,'mounika','mounika@gmail.com');
  constructor(private _enrollmentService:EnrollmentService,private rs: RestService,
              private _registrationService: RegistrationService,public fb:FormBuilder,
              private http:HttpClient,private formBuilder:FormBuilder){}

  headers = ['id', 'name', 'email'];

  employee: Employee[] = [];

  ngOnInit() {

    this.registrationForm=this.formBuilder.group({
      id:[''],
      name:[''],
      email:['']
    });
    //read data
      this.rs.readEmployee()
      .subscribe
        (
          (response) => {
            this.employee = response[0]['data'];
          },
          (error) => {
            console.log('No Data Found' + error);
          }

        );
  }
onSubmit() {
     this.submitted=true;
   // var formData:any=new FormData();
   //   formData.append("id",this.registrationForm.get('id').value);
   //    formData.append("name",this.registrationForm.get('name').value);
   //    formData.append("email",this.registrationForm.get('email').value);

      // this.http.post("http://127.0.0.1:5000/employeepost/",formData).subscribe(
      //   (response)=>console.log(response),
      //   (error)=>console.log(error)
      // );
    console.log(this.registrationForm.value);
    // this._registrationService.register(this.registrationForm.value)
    //   .subscribe(
    //     response => console.log('Success!', response),
    //     error => console.error('Error!', error)
    //   );
   // Convert to JSON-Data to json
    this.stringifiedData = JSON.stringify(this.registrationForm.value);
    console.log("With Stringify :" , this.stringifiedData);
       // Parse from JSON-json to data
    this.parsedJson = JSON.parse(this.stringifiedData);
    console.log("With Parsed JSON :" , this.parsedJson);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
  const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
     this.http.post("http://127.0.0.1:5000/employeepost/",this.registrationForm.value,httpOptions).subscribe(
        (response)=>console.log(response),
        (error)=>console.log(error)
      );
}

}
