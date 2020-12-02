import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchMoviesService} from '../search-movies.service';
import {SearchResult} from '../searchResult.model';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search-entry',
  templateUrl: './search-entry.component.html',
  styleUrls: ['./search-entry.component.css']
})
export class SearchEntryComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  results: SearchResult[];
  isLoading: boolean;
  @Output() searchInput = new EventEmitter<SearchResult[]>();
  searchSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private searchResults: SearchMoviesService) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.searchResults.getSearchResults() //  Call the subscription Will update everytime service is updated
      .subscribe((results) => { //  Success function
        this.results = results.Search; // taking results and passing them to local var
        this.searchInput.emit(this.results); //  emit event when new results are received
      });

    this.searchSub = this.searchForm.controls.search.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (this.searchForm.valid) {
          // console.log(value);  - For DEBUGGING
          this.searchResults.searchForMany(value);
        }
      });
    /*const source = fromEvent<any>(this.el.nativeElement, 'keyup')  EXAMPLE of FROM EVENT
      .pipe(map((e: any) => e.target.value))
      .pipe(filter((text: string) => text.length > 1))
      .pipe(debounceTime(250))
      .subscribe(() => this.isLoading = true);*/
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  search(input: string) {
    if (this.searchForm.valid) {
      this.searchResults.searchForMany(input);
    }
  }

}
