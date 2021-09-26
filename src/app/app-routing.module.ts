import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';
import {AuthGuard} from './auth.guard';
import {UserSettingsComponent} from './user-settings/user-settings/user-settings.component';


const routes: Routes = [
  { path: 'home', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: '', component: AppHomeComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'usr', loadChildren: () => import('./user-settings/user-settings-routing/user-settings-routing.module').then(m => m.UserSettingsRoutingModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth-routing/auth-routing.module').then(m => m.AuthRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
