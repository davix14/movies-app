import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchMoviesService} from '../search-movies.service';
import {SearchResult} from '../searchResult.model';
import {fromEvent, of, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search-entry',
  templateUrl: './search-entry.component.html',
  styleUrls: ['./search-entry.component.css']
})
export class SearchEntryComponent implements OnInit, AfterViewInit, OnDestroy {
  searchForm: FormGroup;
  results: SearchResult[];
  isLoading: boolean;
  @Output() searchInput = new EventEmitter<SearchResult[]>();
  // @ViewChild('searchInput') searchEntry: ElementRef;
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
    /*const source = fromEvent<any>(this.el.nativeElement, 'keyup')
      .pipe(map((e: any) => e.target.value))
      .pipe(filter((text: string) => text.length > 1))
      .pipe(debounceTime(250))
      .subscribe(() => this.isLoading = true);*/
  }

  ngAfterViewInit() {
  }

  searching() { // unused created custom observable from the keyup event on input element
    /*this.searchSub = fromEvent(this.searchEntry.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (this.searchForm.valid) {
          console.log(value);
          // this.searchResults.searchForMany(value);
        }
      });*/
  }

  ngOnDestroy() {
    // this.searchSub.unsubscribe();
  }

  search(input: string) {
    if (this.searchForm.valid) {
      this.searchResults.searchForMany(input);
    }
  }

}
