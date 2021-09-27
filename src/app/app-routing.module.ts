import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'prefix'
  },
  {
    path: 'home',
    loadChildren: () => import('./app-home/app-home.module')
      .then(m => m.AppHomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search-routing.module')
      .then(m => m.SearchRoutingModule),
  },
  {
    path: 'usr',
    loadChildren: () => import('./user-settings/user-settings-routing/user-settings-routing.module')
      .then(m => m.UserSettingsRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing/auth-routing.module')
      .then(m => m.AuthRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
