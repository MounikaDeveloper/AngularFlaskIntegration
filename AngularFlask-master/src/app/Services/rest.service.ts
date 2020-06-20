import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Employee';
@Injectable({
  providedIn: 'root'
})
export class RestService implements OnInit {

  constructor(private http: HttpClient) { }

  employeeUrl = 'http://127.0.0.1:5000/employeeReport/';

  ngOnInit() {
  }

  readEmployee() {
    return this.http.get<Employee[]>(this.employeeUrl);
  }
}
