import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppHomeComponent} from './app-home.component';

const routes: Routes = [
  {path: '', component: AppHomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppHomeRoutingModule {
}
