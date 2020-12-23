import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Movie} from '../movies.model';
import {Subscription} from 'rxjs';
import {MoviesService} from '../movies.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  @Output() editClicked = new EventEmitter();
  private movieSub: Subscription;
  isLoading: boolean;

  constructor(public moviesService: MoviesService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.moviesService.getMovies();
    this.movieSub = this.moviesService.getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.movieSub.unsubscribe();
  }

  onDeleteMovie(id: string) {
    this.moviesService.deleteMovie(id);
  }

  formatDate(date: number): string {
    const format = new Date(date);
    return format.toDateString();
  }

  onEditMovie(idIn: string) {
    this.moviesService.startEditMovie(idIn);
    this.editClicked.emit();
    }
}
