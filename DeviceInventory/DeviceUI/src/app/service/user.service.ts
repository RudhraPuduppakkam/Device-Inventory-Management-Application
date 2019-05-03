import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  gettheprofile(ls){
    return this.http.get("http://localhost:3000/search/"+ls)
  }

  sendtherequest(lss){
    return this.http.get("http://localhost:3000/send/"+lss)
  }

}
