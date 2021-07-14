import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }

  get400Error() {
    this._http.get(`${this.baseUrl}/buggy/bad-request`)
      .subscribe(res => {
        console.log(res);
      }, error => console.log(error))
  }

  get400ValidationError() {
    this._http.post(`${this.baseUrl}/account/register`, {})
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error)
        this.validationErrors = error
      })
  }

  get401Error() {
    this._http.get(`${this.baseUrl}/buggy/auth`)
      .subscribe(res => {
        console.log(res);
      }, error => console.log(error))
  }

  get404Error() {
    this._http.get(`${this.baseUrl}/buggy/not-found`)
      .subscribe(res => {
        console.log(res);
      }, error => console.log(error))
  }

  get500Error() {
    this._http.get(`${this.baseUrl}/buggy/server-error`)
      .subscribe(res => {
        console.log(res);
      }, error => console.log(error))
  }

}
