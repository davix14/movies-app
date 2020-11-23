import {Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import {SearchResult} from './searchResult.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output()results: SearchResult[];

  ngOnInit() {
  }

}
