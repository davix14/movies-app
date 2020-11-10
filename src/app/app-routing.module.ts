import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {ListMoviesComponent} from './list-movies/list-movies.component';


const routes: Routes = [
  { path: '', component: CreateMovieComponent},
  { path: 'list', component: ListMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
