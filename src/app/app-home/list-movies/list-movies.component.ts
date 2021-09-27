import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Movie} from '../../movies.model';
import {Subscription} from 'rxjs';
import {MoviesService} from '../../movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: 'list-movies.component.html',
  styleUrls: ['list-movies.component.css']
})
export class ListMoviesComponent implements OnInit, OnDestroy {
  movies: Movie[] = []; //  Holds movies received from movies service
  @Output() editClicked = new EventEmitter(); //  ng Output and eventEmitter to let parent component know when edit is clicked
  private movieSub: Subscription;
  isLoading: boolean; //  Indicator used to display spinner

  constructor(public moviesService: MoviesService) {
  }

  ngOnInit(): void { //  On Initialization:
    this.isLoading = true; //  Set is loading to true
    this.moviesService.getMovies(); //  Calls service to request movies from server
    this.movieSub = this.moviesService.getMovieUpdateListener() //  Sets up the subscription to the moviesUpdated subject
      .subscribe((movies: Movie[]) => { //  When moviesUpdated has new value:
        // console.log(movies);
        this.movies = movies; //  Copy incoming movies
        this.isLoading = false; //  Set isLoading to false since we have the movies now
      });
  }

  ngOnDestroy() { //  Unsubscribe when destroying
    this.movieSub.unsubscribe();
  }

  onDeleteMovie(id: string) { //  Call movie service to delete move based on id passed
    this.moviesService.deleteMovie(id);
  }

  formatDate(date: number): string { //  method to turn timestamp to string
    const format = new Date(date);
    return format.toDateString();
  }

  onEditMovie(idIn: string) { //  method for editing movie
    this.moviesService.startEditMovie(idIn); //
    this.editClicked.emit();
    }
}
