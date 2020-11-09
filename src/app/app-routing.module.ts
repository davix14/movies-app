import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMovieComponent} from './create-movie/create-movie.component';


const routes: Routes = [
  { path: '', component: CreateMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
