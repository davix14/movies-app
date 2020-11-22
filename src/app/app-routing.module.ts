import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {ListMoviesComponent} from './list-movies/list-movies.component';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';


const routes: Routes = [
  { path: '', component: AppHomeComponent},
  { path: 'list', component: ListMoviesComponent },
  { path: 'create', component: CreateMovieComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
