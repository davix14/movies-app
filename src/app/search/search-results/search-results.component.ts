import {Component, Input, OnInit} from '@angular/core';
import {SearchResult} from '../searchResult.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input()searchResults: SearchResult[];
  constructor() { }

  ngOnInit(): void {
  }

}
