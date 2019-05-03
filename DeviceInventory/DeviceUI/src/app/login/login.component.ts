import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../service/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  obj:any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private logser: LoginserviceService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
console.log(this.loginForm.value.username,"1");
this.logser.checkDetails(this.loginForm.value.username, this.loginForm.value.password).subscribe(data=>{
  this.obj = data;
  console.log("success",this.obj.role)
  if(this.obj.role=="admin"){
    this.router.navigate(['/admin'])
    localStorage.setItem('un', this.loginForm.value.username)
    console.log(localStorage.getItem('un'))
  }
  else{
    this.router.navigate(['/user'])
    localStorage.setItem('un', this.loginForm.value.username)

  }
})

}

}
