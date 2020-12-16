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
  private user: User;
  private token: string;
  private tokenUpdated = new BehaviorSubject(null);
  private userUpdated = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserUpdated() {
    return this.userUpdated.asObservable();
  }

  getTokenUpdated() {
    return this.tokenUpdated.asObservable();
  }

  login(username: string, password: string) {
    const credentials = {
      username,
      password
    };
    return this.http
      .post<{ authUser: User, token: string }>('http://localhost:3000/api/users/login', credentials)
      /*.pipe(
      map(userData => {
        return null
      })x1
    )*/
      .subscribe((response) => {
        console.log(response.authUser);
        this.user = response.authUser;
        this.token = response.token;
        this.tokenUpdated.next(this.token);
        this.userUpdated.next(this.user);
        this.router.navigate(['/home']);
      });
  }

  registerUser(name: string, username: string, password: string, date: number) {
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

}
