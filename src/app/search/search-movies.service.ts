import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Movie} from '../movies.model';

@Injectable({
  providedIn: 'root'
})
export class SearchMoviesService {
  private moviesUpdated = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getSearchResults() {
    return this.moviesUpdated.asObservable();
  }

  searchForMany(param: string) {
    this.http.get('http://www.omdbapi.com/?apikey=22df56fe&s=' + param)
      .subscribe(value => {
        this.moviesUpdated.next(value);
        });
  }

}
