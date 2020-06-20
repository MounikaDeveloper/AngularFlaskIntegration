import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder,FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  form:FormGroup;

   _url='http://127.0.0.1:5000/employeepost/';

  constructor(private _http: HttpClient,private fb:FormBuilder) {
    this.form=this.fb.group({
      id:[''],
      name:[''],
      email:[''],
      avatar:[null]
    })
  }

  register(userData) {
    return this._http.post<any>(this._url, userData);
  }

  ngOnInit(): void {
  }
  registrationForm()
  {

    console.log(this.form.value);
     //  var formData:any=new FormData();
     // formData.append("id",this.registrationForm.get('id').value);
     //  formData.append("name",this.registrationForm.get('name').value);
     //  formData.append("email",this.registrationForm.get('email').value);
     //  this.http.post("http://127.0.0.1:5000/employeepost/",formData).subscribe(
     //    (response)=>console.log(response),
     //    (error)=>console.log(error)
     //  );
  }
}

