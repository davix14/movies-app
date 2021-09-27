import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

  constructor(private diag: MatDialog, private movieService: MoviesService) { //  Injected MatDialog to use pop-up modal
  }

  ngOnInit(): void {
  }

  openEnterMovie() { //  Method to handle opening and closing pop-up modal
    //  use injected diag to open modal using CreateMovieComponent and give it a set width
    const dialogRef = this.diag.open(CreateMovieComponent, {
      width: '200vw',
    });

    dialogRef.afterClosed().subscribe(result => { //  Set action to take once dialog box is closed
      console.log('The dialog was closed' + result);
      this.movieService.clearSearchResultSelected();
      this.movieService.cancelEditMovie();
    });
  }

}


