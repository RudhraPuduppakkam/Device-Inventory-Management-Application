import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeviceUI';

  constructor(
    
    private router: Router
  ){}
  b=localStorage.getItem('un')
  logout(){
   let n=localStorage.setItem('un', '')
   console.log(n, "n")
    this.router.navigate(['/login'])
  }
}
