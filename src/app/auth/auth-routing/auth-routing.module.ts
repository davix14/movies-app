import {NgModule} from '@angular/core';
import {LoginComponent} from '../../login/login.component';
import {NewUserComponent} from '../../new-user/new-user.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: NewUserComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
