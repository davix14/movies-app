import {Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchMoviesService} from './search-movies.service';
import {Observable, fromEvent} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';
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
