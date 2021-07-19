import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppHeaderComponent} from './app-header/app-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ListMoviesComponent} from './list-movies/list-movies.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppHomeComponent} from './app-home/app-home.component';
import {SearchComponent} from './search/search.component';
import {SearchResultsComponent} from './search/search-results/search-results.component';
import {SearchEntryComponent} from './search/search-entry/search-entry.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {NewUserComponent} from './new-user/new-user.component';
import {RegisterFormComponent} from './new-user/register-form/register-form.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthInterceptor} from './auth-interceptor';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {FlexLayoutModule} from '@angular/flex-layout';

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
    RegisterFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSliderModule,
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        HttpClientModule,
        MatGridListModule,
        MatDialogModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatChipsModule,
        MatStepperModule,
        FlexLayoutModule
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
