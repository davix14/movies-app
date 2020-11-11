import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../movies.model';
import {Subscription} from 'rxjs';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];

  private  movieSub: Subscription;

  constructor(public moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies();
    this.movieSub = this.moviesService.getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      });
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }

}
