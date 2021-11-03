import { Component, OnInit } from '@angular/core';
import {SearchMoviesService} from "../search-movies.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent implements OnInit {
  private pageSub: Subscription;
  pageNumber: number;

  constructor(private searchMovieService: SearchMoviesService) { }

  ngOnInit(): void {
    this.pageSub = this.searchMovieService.getPageNumber()
      .subscribe( (n: number) => {
        this.pageNumber = n;
      });
  }

  nextPage() {
    this.searchMovieService.nextPage();
  }

  previousPage() {
    this.searchMovieService.previousPage();
  }

}
