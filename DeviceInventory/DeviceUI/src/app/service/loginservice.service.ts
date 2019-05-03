import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  obj1:object;
  constructor(private http: HttpClient) { }
  checkDetails(username, password){
    this.obj1={
      user:username,
      pass:password
    }
    return this.http.post("http://localhost:3000/login/",this.obj1)
  }
}
