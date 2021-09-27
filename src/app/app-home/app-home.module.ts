import {NgModule} from '@angular/core';

import {AngularMaterialModule} from '../angular-material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {ListMoviesComponent} from './list-movies/list-movies.component';
import {AppHomeComponent} from './app-home.component';
import {SearchModule} from '../search/search.module';
import {AppHomeRoutingModule} from './app-home-routing.module';

@NgModule({
  declarations: [
    AppHomeComponent,
    CreateMovieComponent,
    ListMoviesComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SearchModule,
    ReactiveFormsModule,
    AppHomeRoutingModule
  ],
  exports: [
    AppHomeComponent,
    CreateMovieComponent,
    ListMoviesComponent
  ]
})
export class AppHomeModule { }
