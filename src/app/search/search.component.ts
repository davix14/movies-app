import {Component, OnInit} from '@angular/core';
import {SearchResult} from './searchResult.model';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: SearchResult[]; //  holds array of search results
  gridRowHeight = '50vh'; //  Used to control the row height
  gridColNums = 1; //  Used to control the column #s in the grid

  constructor(public breakPointObserver: BreakpointObserver) { //  Injecting the breakpoint observer
  }

  ngOnInit() {
    this.breakPointObserver.observe([ //  Starting the breakPoint observer and breakpoints to check for below
      Breakpoints.Tablet, //  Breakpoint for Tablet size
    ])
      .subscribe(result => { //  Subscribing to breakpoint activity - result provides breakpoints triggered (?)
        if (result.matches) { //  Checkes if breakpoint sized received (result) matches current viewport size
          // console.log(); //  For debugging
          this.gridRowHeight = '40vh'; //  IF tablet : - Shrink rowHeight
          this.gridColNums = 2; //  - Increase Col #
        } else { // -IF not tablet:
          this.gridRowHeight = '50vh'; //  Set rowHeight and Col # back to defaults
          this.gridColNums = 1;
        }
      });
  }

  getResults(results: SearchResult[]) {
    this.results = results;
    // console.log(this.results);  For Debugging
  }

}
