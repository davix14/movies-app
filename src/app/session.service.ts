import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user = {};
  private userUpdated = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getUserUpdated() {
    return this.userUpdated.asObservable();
  }

  startLogin(username: string) {
    this.http
      .get('http://localhost:3000/api/movies')
      .pipe(
        map(userData => {
          return null;
        })
      )
      .subscribe(() => {

      });
  }

}
