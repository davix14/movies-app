import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppHeaderComponent} from './app-header/app-header.component';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ListMoviesComponent} from './list-movies/list-movies.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';
import {SearchResultsComponent} from './search/search-results/search-results.component';
import {SearchEntryComponent} from './search/search-entry/search-entry.component';
import {AuthInterceptor} from './auth-interceptor';
import {UserSettingsComponent} from './user-settings/user-settings/user-settings.component';
import {AngularMaterialModule} from './angular-material.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CreateMovieComponent,
    ListMoviesComponent,
    AppHomeComponent,
    SearchComponent,
    SearchResultsComponent,
    SearchEntryComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AuthModule
  ],
  entryComponents: [
    CreateMovieComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
