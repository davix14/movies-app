import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SearchResult} from '../searchResult.model';
import {MoviesService} from '../../movies.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input()sr: SearchResult;

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
  }

  movieSelected(result: SearchResult) {
    // console.log(result);
    console.log('MOVIE ADDED!');
    this.movieService.setSearchResultSelected(result);
  }

}
