import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {ListMoviesComponent} from './list-movies/list-movies.component';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  { path: 'home', component: AppHomeComponent},
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
