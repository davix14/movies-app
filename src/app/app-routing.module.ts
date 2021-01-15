import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';
import {NewUserComponent} from './new-user/new-user.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: 'home', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: '', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register', component: NewUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
