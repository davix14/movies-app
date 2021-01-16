import {Component, OnInit} from '@angular/core';
import {SearchResult} from './searchResult.model';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: SearchResult[];
  gridRowHeight = '50vh';
  gridColNums = 1;

  constructor(public breakPointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakPointObserver.observe([
      Breakpoints.Tablet,
    ])
      .subscribe(result => {
        if (result.matches) {
          // console.log('TABLET SCREEN DETECTED!');
          this.gridRowHeight = '40vh';
          this.gridColNums = 2;
        } else {
          this.gridRowHeight = '50vh';
          this.gridColNums = 1;
        }
      });
  }

  getResults(results: SearchResult[]) {
    this.results = results;
    console.log(this.results);
  }

}
