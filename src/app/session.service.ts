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

  startLogin(username: string) {
    /*this.http
      .get('http://localhost:3000/api/movies')
      .pipe(
        map(userData => {
          return null;
        })
      )
      .subscribe(() => {

      });*/
  }

  registerUser(name: string, username: string, date: number) {
    const userData: User = {
      id: null,
      name: name,
      username: username,
      registrationDate: date,
      lastUpdate: date
    };
    this.http
      .post<{ message: string, user: User }>('http://localhost:3000/api/users/newUser', userData)
      .subscribe((responseData) => {
        this.user = responseData.user;
      });
  }

}
