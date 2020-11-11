import { Injectable } from '@angular/core';
import {Movie} from './movies.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {response} from 'express';
import {map} from 'rxjs/operators';

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

    this.http.get<{message: string, movies: any}>('http://localhost:3000/api/movies')
      .pipe(
        map(movieData => {
          return movieData.movies.map(movie => {
            return {
              id: movie._id,
              title: movie.title,
              rating: movie.rating,
              description: movie.description,
              dateEntered: movie.dateEntered
            };
          });
        })
      )
      .subscribe((transformedMovies) => {
        this.allMovies = transformedMovies;
        this.moviesUpdated.next([...this.allMovies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(titleIn: string, ratingIn: number, descriptionIn: string, dateEnteredIn: number) {
    const movie: Movie = {
      id: null,
      title: titleIn,
      rating: ratingIn,
      description: descriptionIn,
      dateEntered: dateEnteredIn
    };
    this.http
      .post<{ message: string; movieId: string }>('http://localhost:3000/api/movies', movie)
      .subscribe((responseData) => {
        const id = responseData.movieId;
        movie.id = id;
        this.allMovies.push(movie); //  Adds new movie to Movies array
        this.moviesUpdated.next([...this.allMovies]); //  Returns copy of Movies array
      });

  }

}
