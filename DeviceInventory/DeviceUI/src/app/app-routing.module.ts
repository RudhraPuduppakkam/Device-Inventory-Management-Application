import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent} from './details/details.component';
import { LoginComponent } from './login/login.component';
import { UserviewComponent } from './userview/userview.component';
const routes: Routes = [
  {path: 'user', component: UserviewComponent },
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
