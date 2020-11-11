import { Injectable } from '@angular/core';
import {Movie} from './movies.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private allMovies: Movie[] = [
    {
      id: null,
      title: 'Old WOWZA',
      rating: 4,
      description: 'green',
      dateEntered: null
    }
  ]; //  Holds all movies - added one as placeholder to see changes to list component
  private moviesUpdated = new Subject<Movie[]>(); //  Used to update all required places

  constructor(private http: HttpClient) { }

  getMovies() {

    this.http.get<{message: string, movies: Movie[]}>('http://localhost:3000/api/movies')
      .subscribe((response) => {
        this.allMovies = response.movies;
        this.moviesUpdated.next([...this.allMovies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(movie: Movie) {
    this.allMovies.push(movie); //  Adds new movie to Movies array
    this.moviesUpdated.next([...this.allMovies]); //  Returns copy of Movies array
  }

}
