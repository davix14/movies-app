import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Movie} from '../movies.model';

@Injectable({
  providedIn: 'root'
})
export class SearchMoviesService {
  private moviesUpdated = new Subject<any>();
  private API_URL = 'http://www.omdbapi.com/?';
  private API_KEY = 'apikey=22df56fe';

  constructor(private http: HttpClient) {
  }

  getSearchResults() {
    return this.moviesUpdated.asObservable();
  }

  searchForMany(param: string) {
    this.http
      .get(this.API_URL + this.API_KEY + '&s=' + param)
      .subscribe(value => {
        this.moviesUpdated.next(value);
      });
  }

}
