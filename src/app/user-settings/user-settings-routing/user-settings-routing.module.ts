import {NgModule} from '@angular/core';
import {UserSettingsComponent} from '../user-settings/user-settings.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'userSettings', component: UserSettingsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule {
}
