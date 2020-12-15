import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User;
  private userUpdated = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  getUserUpdated() {
    return this.userUpdated.asObservable();
  }

  login(username: string, password: string) {
    const credentials = {
      username,
      password
    };
    this.http
      .post('http://localhost:3000/api/users/login', credentials)
      /*.pipe(
        map(userData => {
          return null;
        })
      )*/
      .subscribe((response) => {
        console.log(response);
      });
  }

  registerUser(name: string, username: string, password: string, date: number) {
    const userData: User = {
      id: null,
      name: name,
      username: username,
      password: password,
      registrationDate: date,
      lastUpdate: date
    };
    return this.http
      .post<{ message: string, user: User }>('http://localhost:3000/api/users/newUser', userData)
      .pipe<User>(
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
      );
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
