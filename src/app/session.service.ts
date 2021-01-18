import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User = null;
  private tokenUpdated = new BehaviorSubject(null);
  private token: string;
  private userUpdated = new BehaviorSubject(null);
  private tokenTimer: any;
  isAuthenticated = false;
  private latestError = new BehaviorSubject<HttpErrorResponse>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserId() {
    return this.user.id;
  }

  getToken() {
    return this.token;
  }

  getLatestError() {
    return this.latestError.asObservable();
  }

  resetLatestError() {
    this.latestError.next(null);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserUpdated() {
    return this.userUpdated.asObservable();
  }

  getTokenUpdated() {
    return this.tokenUpdated.asObservable();
  }

  registerUser(name: string, username: string, password: string, date: number) { //  Method to register new user
    // Create userData to hold all args
    const userData: User = {
      id: null,
      name,
      username,
      password,
      registrationDate: date,
      lastUpdate: date
    };
    return this.http
      .post<{ message: string, success: boolean }>(environment.api_url + '/api/users/newUser', userData);
    /*.pipe<User>(
      map(resp => {
        return {
          id: resp.user.id,
          name: resp.user.name,
          username: resp.user.username,
          password: resp.user.password,
          registrationDate: resp.user.registrationDate,
          lastUpdate: resp.user.lastUpdate
        };
      })
    );*/

    /*.subscribe((responseData) => {
      if (responseData != null) {
        // console.log(responseData);
        // this.user = responseData;
        // this.userUpdated.next(this.user);
        return true;
      } else {
        return false;
      }
    });*/

  }

  login(username: string, password: string) { // Method for authenticating the user
    try {
      const credentials = { //  Create credentials obj to pass to server
        username,
        password
      };
      return this.http //  Make http post request to the server including the credentials object
        .post<{ authUser: User, token: string, expiresIn: number }>(environment.api_url + '/api/users/login', credentials)
        .subscribe((response) => {  // When response is received
          // console.log(response + 'REPOLY!!');
          const expiresInDuration = response.expiresIn; // set var to expiresIn time
          this.setAuthTimer(expiresInDuration); //  setAuthTimer for timeout of token
          this.user = response.authUser; //  set user to user obj returned
          this.tokenUpdated.next(response.token); //  save and broadcast token
          this.token = response.token;
          this.userUpdated.next(this.user); // save and broadcast user
          this.isAuthenticated = true; //  Set isAuthenticated to true
          const now = new Date(); //  create new date obj
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);  //  Calculate time token will expire by getting a timestamp
          // and adding expiration time (transformed from milliseconds to sec)
          // console.log('Token expires in: ' + expirationDate); for debugging
          this.saveAuthData(response.authUser, response.token, expirationDate); //  Save user obj, token, and expiration date in localstorage
          this.router.navigate(['/home']); //  Navigate user to the home url
        }, (error => {
          // console.log(error);
          this.latestError.next(error);
        }));
    }
    catch (e) {
      console.log('HAPPY GILMORE!' + e);

    }
  }

  autoAuthUser() {  // method to use local storage to get previously authenticated user
    const authInformation = this.getAuthData(); //  Call getAuthData to retrieve auth data from localstorage
    if (!authInformation) { //  If null do nothing and return
      return;
    }
    const now = new Date();  //  New date obj
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); //  compare expiration date with current timestamp
    if (expiresIn > 0) { //  If ^ is > 0 then token is still valid and information can still be used
      this.tokenUpdated.next(authInformation.token);
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.userUpdated.next(this.user);
      this.setAuthTimer(expiresIn / 1000); //  Set authTimer to the remaining time
      // this.authStatusListener.next(true);
    }
  }

  logout() {
    //  Set all authentication information to false when logging out
    this.tokenUpdated.next(null);
    this.token = null;
    this.userUpdated.next(null);
    this.user = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    console.log('User has been logged out');
  }

  private setAuthTimer(duration: number) { //  Method to set a timer for the token timeout
    //console.log('Setting timer: ' + duration); //  Console log the duration
    this.tokenTimer = setTimeout(() => { //  Set timeout and call logout method when the timer runs out
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(user: User, token: string, expirationDate: Date) { //  Save all args in localstorage
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(user)); //  Must stringify obj prior to saving
  }

  private clearAuthData() { //  Clear all localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
  }

  private getAuthData() {  //  method to retrieve all items in localstorage
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = JSON
      .parse(localStorage.getItem('user'));
    if (!token || !expirationDate || !user) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      user
    };
  }

}
