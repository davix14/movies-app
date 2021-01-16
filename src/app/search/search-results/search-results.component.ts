import {Component, Input, OnInit} from '@angular/core';
// import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {SearchResult} from '../searchResult.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input()sr: SearchResult;
  constructor() { }

  ngOnInit(): void {
  }

}
