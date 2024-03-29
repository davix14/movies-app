import {NgModule} from '@angular/core';
import {SearchComponent} from './search.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {SearchEntryComponent} from './search-entry/search-entry.component';
import {AngularMaterialModule} from '../angular-material.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SearchComponent,
    SearchResultsComponent,
    SearchEntryComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
