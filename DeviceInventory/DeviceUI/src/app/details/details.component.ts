import { Component, OnInit } from '@angular/core';
import { DetailsserviceService} from '../service/detailsservice.service'
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  y:any = null
  z:any = null
  get:boolean=false;
  view:boolean=false;
  errorMessage:string="";
  constructor(
    private userdet: DetailsserviceService
  ) { }

  ngOnInit() {
  }
  allDetails() {
    this.userdet.getAllDetails().subscribe(data => {
      console.log("success", data)
      this.y=data
    },
    err=>{
      this.errorMessage="Could not get details"
    })
  }
  viewRequests() {
    if(this.view==true){
      this.view=false
    }
    else{
      this.view=true
    }
    this.userdet.viewAllDetails().subscribe(data => {
      console.log("success", data)
      this.z=data
      if(this.z.length==0){
        this.errorMessage="No active requests"
      }
    },err=>{
        this.errorMessage=""
      }
    
    )
  }
  accept(d, key) {
    this.userdet.acceptof(d,key).subscribe(data => {
      console.log("success", data)
      this.viewRequests()
    },
    err=>{
      if(key==1){
      this.errorMessage="could not accept the request";}
      if(key==2){
        this.errorMessage="could not reject the request"
      }
    })
  }

  locate(c, key1){
    this.userdet.locateof(c,key1).subscribe(data => {
      console.log("success", data)
      this.allDetails()
    },
    err=>{
      if(key1==1){
        this.errorMessage="could not deallocate"
      }
      if(key1==2){
        this.errorMessage="could not reallocate"
      }
    })
  }
}
