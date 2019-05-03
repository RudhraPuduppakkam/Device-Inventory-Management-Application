import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsserviceService {

  constructor(private http: HttpClient) { }
  getAllDetails(){
    return this.http.get("http://localhost:3000/searchall/")
  }
  viewAllDetails(){
    return this.http.get("http://localhost:3000/viewall/")
  }
  acceptof(d,key){
    if(key==1){
      return this.http.get("http://localhost:3000/accept/"+d)
    }
    else{
      return this.http.get("http://localhost:3000/reject/"+d)
    }
  }
  locateof(c,key1){
    if(key1==1){
      return this.http.get("http://localhost:3000/delete/"+c)
    }
    else{
      return this.http.get("http://localhost:3000/requests/"+c)
    }
  }
}
