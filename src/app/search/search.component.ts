import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResult} from './searchResult.model';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {Movie} from '../movies.model';
import {MoviesService} from '../movies.service';
import {SearchMoviesService} from "./search-movies.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  results: SearchResult[] = null; //  holds array of search results
  gridRowHeight = '45vh'; //  Used to control the row height
  gridColNums = 1; //  Used to control the column #s in the grid
  private editing: Subscription;

  edit = {
    mode: null,
    movie: null
  };

  constructor(public breakPointObserver: BreakpointObserver,
              private movieService: MoviesService,
              private searchMovieService: SearchMoviesService) { //  Injecting the breakpoint observer
  }

  ngOnInit() {
    /*this.breakPointObserver.observe([ //  Starting the breakPoint observer and breakpoints to check for below
      Breakpoints.Tablet, //  Breakpoint for Tablet size
    ])
      .subscribe(result => { //  Subscribing to breakpoint activity - result provides breakpoints triggered (?)
        if (result.matches) { //  Checkes if breakpoint sized received (result) matches current viewport size
          // console.log(); //  For debugging
          this.gridRowHeight = '40vh'; //  IF tablet : - Shrink rowHeight
          this.gridColNums = 2; //  - Increase Col #
        } else { // -IF not tablet:
          this.gridRowHeight = '45vh'; //  Set rowHeight and Col # back to defaults
          this.gridColNums = 1;
        }
      });*/
    this.searchMovieService.resetPageNumber();
    this.searchMovieService.resetLastSearch();
    this.editing = this.movieService.getEditMovieUpdateListener()
      .subscribe((movie: Movie[]) => {
        // console.log(movie[0]);
        if (movie != null){
          this.edit.mode = true;
          this.edit.movie = movie[0];
        } else {
          this.edit.mode = false;
          this.edit.movie = null;
        }
      });
  }

  getResults(results: SearchResult[]) {
    this.results = results;
    // console.log(this.results);  For Debugging
  }

  ngOnDestroy() {
    this.editing.unsubscribe();
    this.searchMovieService.resetPageNumber();
    this.searchMovieService.resetLastSearch();
  }

}
