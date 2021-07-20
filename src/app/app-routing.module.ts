import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';
import {NewUserComponent} from './new-user/new-user.component';
import {AuthGuard} from './auth.guard';
import {UserSettingsComponent} from './user-settings/user-settings/user-settings.component';


const routes: Routes = [
  { path: 'home', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: '', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'register', component: NewUserComponent },
  { path: 'userSettings', component: UserSettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
