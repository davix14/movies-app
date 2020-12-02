import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateMovieComponent} from '../create-movie/create-movie.component';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {

  constructor(private diag: MatDialog) {
  }

  ngOnInit(): void {
  }

  openEnterMovie() {
    const dialogRef = this.diag.open(CreateMovieComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


