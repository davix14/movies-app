import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../../angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UserSettingsComponent} from './user-settings.component';
import {UserSettingsRoutingModule} from '../user-settings-routing/user-settings-routing.module';



@NgModule({
  declarations: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    UserSettingsRoutingModule
  ]
})
export class UserSettingsModule { }
