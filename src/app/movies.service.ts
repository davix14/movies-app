import { Injectable } from '@angular/core';
import {Movie} from './movies.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private allMovies: Movie[] = [
    {
      id: null,
      title: 'new moive',
      rating: 4,
      description: 'green',
      dateEntered: null
    }
  ]; //  Holds all movies - added one as placeholder to see changes to list component
  private moviesUpdated = new Subject<Movie[]>(); //  Used to update all required places

  constructor() { }

  getMovies(): Movie[] {
    return [...this.allMovies];
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(movie: Movie) {
    this.allMovies.push(movie); //  Adds new movie to Movies array
    this.moviesUpdated.next([...this.allMovies]); //  Returns copy of Movies array
  }

}
