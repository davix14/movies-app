import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SearchResult} from '../searchResult.model';
import {MoviesService} from '../../movies.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input()sr: SearchResult;

  private ignore: boolean = null;
  private currentRt;

  constructor(private movieService: MoviesService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRt = this.actRoute.root;

  }

  movieSelected(result: SearchResult) {
    // console.log(result);
    console.log('MOVIE ADDED!');
    this.movieService.setSearchResultSelected(result);
    console.log(this.currentRt);
  }

}
