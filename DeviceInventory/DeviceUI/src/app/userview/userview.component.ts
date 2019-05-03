import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  x:any = null
  a:any = null
  profile:boolean=false;
  errorMessage:string="";
  constructor(
    private ud: UserService
  ) { }

  ngOnInit() {
  }
sendRequest(){
  this.ud.sendtherequest(localStorage.getItem('un')).subscribe(data =>{
    console.log("success", data)
    this.x=data

  },
  err=>{
    this.errorMessage="Could not send request"
  })
}

viewProfile(){
  if(this.profile==true){
    this.profile=false
  }
  else{
    this.profile=true
  }
  this.ud.gettheprofile(localStorage.getItem('un')).subscribe(data =>{
    console.log("success", data)
    this.a=data
  },
  err=>{
    this.a.errorMessage="Could not get profile"
  })
}
}
