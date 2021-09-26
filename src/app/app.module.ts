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
import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {NewUserComponent} from './new-user/new-user.component';
import {RegisterFormComponent} from './new-user/register-form/register-form.component';
import {AuthInterceptor} from './auth-interceptor';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserSettingsComponent} from './user-settings/user-settings/user-settings.component';
import {AngularMaterialModule} from './angular-material.module';

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
    LoginComponent,
    LoginFormComponent,
    NewUserComponent,
    RegisterFormComponent,
    UserSettingsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularMaterialModule
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
