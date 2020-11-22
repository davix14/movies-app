import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchMoviesService} from './search-movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  results;

  constructor(private fb: FormBuilder, private searchResults: SearchMoviesService) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    });
    this.searchResults.getSearchResults()
      .subscribe((results) => {
        this.results = results.Search;
      });
  }

  search(input: string) {
    this.searchResults.searchForMany(input);
  }

}
