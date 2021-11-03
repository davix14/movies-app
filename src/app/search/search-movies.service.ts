import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Movie} from '../movies.model';
import {Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchMoviesService {
  private moviesUpdated = new Subject<any>();
  private API_URL = 'https://www.omdbapi.com/?';
  private API_KEY = 'apikey=22df56fe';

  //  will be used for page param in api request
  private pageNumber = 1;
  //  will be used to share page number
  private pageSuject = new BehaviorSubject<number>(1);
  //  cached search entry
  private lastSearch: string;

  constructor(private http: HttpClient) {

  }

  getSearchResults() {
    return this.moviesUpdated.asObservable();
  }

  searchForMany(param: string) {
    this.lastSearch = param;
    this.http
      .get(this.API_URL + this.API_KEY + '&s=' + param + '&page=' + this.pageNumber, { headers: { Anonymous: '' } })
      .subscribe(value => {
        this.moviesUpdated.next(value);
      });
  }
  //  Methods for page numbers
  getPageNumber() {
    return this.pageSuject.asObservable();
  }

  nextPage() {
    console.log(this.pageNumber);
    this.pageNumber = this.pageNumber + 1;
    this.pageSuject.next(this.pageNumber);
    this.searchForMany(this.lastSearch);
  }

  previousPage() {
    this.pageNumber = this.pageNumber - 1;
    this.pageSuject.next(this.pageNumber);
    this.searchForMany(this.lastSearch);
  }

  resetPageNumber() {
    this.pageNumber = 1;
    this.pageSuject.next(this.pageNumber);
  }
  //  END of pageNumber methods

  // Methods for lastSearch cache var
  setLastSearch(search: string) {
    this.lastSearch = search;
  }

  resetLastSearch() {
    this.lastSearch = null;
  }
  //  END of lastSearch methods
}
