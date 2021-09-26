import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../../angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserSettingsComponent} from './user-settings.component';



@NgModule({
  declarations: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserSettingsModule { }
