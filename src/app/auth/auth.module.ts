import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {LoginFormComponent} from '../login/login-form/login-form.component';
import {NewUserComponent} from '../new-user/new-user.component';
import {RegisterFormComponent} from '../new-user/register-form/register-form.component';
import {AngularMaterialModule} from '../angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    NewUserComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
