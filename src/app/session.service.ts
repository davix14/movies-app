import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User = null;
  private tokenUpdated = new BehaviorSubject(null);
  private userUpdated = new BehaviorSubject(null);
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserUpdated() {
    return this.userUpdated.asObservable();
  }

  getTokenUpdated() {
    return this.tokenUpdated.asObservable();
  }

  registerUser(name: string, username: string, password: string, date: number) {
    // Create
    const userData: User = {
      id: null,
      name,
      username,
      password,
      registrationDate: date,
      lastUpdate: date
    };
    return this.http
      .post<{ message: string, success: boolean }>('http://localhost:3000/api/users/newUser', userData);
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

  login(username: string, password: string) {
    const credentials = {
      username,
      password
    };
    return this.http
      .post<{ authUser: User, token: string, expiresIn: number }>('http://localhost:3000/api/users/login', credentials)
      /*.pipe(
      map(userData => {
        return null
      })x1
    )*/
      .subscribe((response) => {
        console.log(response.authUser);
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.user = response.authUser;
        this.tokenUpdated.next(response.token);
        this.userUpdated.next(this.user);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(response.authUser.id, response.token, expirationDate);
        this.router.navigate(['/home']);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.tokenUpdated.next(authInformation.token);
      // this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      // this.authStatusListener.next(true);
    }
  }

  logout() {
    //  Set all authentication information to false when logging out
    this.tokenUpdated.next(null);
    this.userUpdated.next(null);
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(id: string, token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userID', id);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

}
