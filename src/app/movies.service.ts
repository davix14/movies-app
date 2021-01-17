import {Injectable} from '@angular/core';
import {Movie} from './movies.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private allMovies: Movie[] = []; //  Holds all movies - added one as placeholder to see changes to list component
  private moviesUpdated = new Subject<Movie[]>(); //  Used to update all required places
  private movieEdit = new BehaviorSubject<Movie[]>(null); //  Used to update all required places
  constructor(private http: HttpClient) {
  }

  getMovies() {

    this.http.get<{ message: string, movies: any }>(environment.api_url + '/api/movies')
      .pipe(
        map(movieData => {
          return movieData.movies.map(movie => {
            return {
              id: movie._id,
              title: movie.title,
              rating: movie.rating,
              description: movie.description,
              dateEntered: movie.dateEntered,
              creator: movie.creator
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

  getEditMovieUpdateListener() {
    return this.movieEdit.asObservable();
  }

  startEditMovie(idIn: string) {
    return this.movieEdit.next(this.allMovies.filter(movie => movie.id === idIn));
  }

  cancelEditMovie() {
    this.movieEdit.next(null);
  }

  sendEditMovie(idIn: string, titleIn: string,
                ratingIn: number, descriptionIn: string,
                dateEnteredIn: number, dateChangedIn: number,
                creatorIn: string) {
    const movie: Movie = { //  Create new Movie obj
      id: idIn,
      title: titleIn,
      rating: ratingIn,
      description: descriptionIn,
      dateEntered: dateEnteredIn,
      dateChanged: dateChangedIn,
      creator: creatorIn
    };
    this.http //  Send PUT to backend and attach movie obj
      .put<{ message: string }>(environment.api_url + '/api/movies', movie)
      .subscribe(() => { //  When successful
        this.allMovies.forEach((value: Movie) => { //  Check each entry
          if (value.id === movie.id) { // Replace Values of local array once DB is updated IF equal to id of updated movie
            value.title = movie.title;
            value.rating = movie.rating;
            value.description = movie.description;
            value.dateEntered = movie.dateEntered;
          }
        });
        this.moviesUpdated.next([...this.allMovies]); //  Returns copy of Movies array
      });
  }

  addMovie(titleIn: string, ratingIn: number,
           descriptionIn: string, dateEnteredIn: number,
           creatorIn: string) {
    const movie: Movie = {
      id: null,
      title: titleIn,
      rating: ratingIn,
      description: descriptionIn,
      dateEntered: dateEnteredIn,
      dateChanged: dateEnteredIn,
      creator: creatorIn
    };
    this.http
      .post<{ message: string; movieId: string }>(environment.api_url + '/api/movies', movie)
      .subscribe((responseData) => {
        movie.id = responseData.movieId;
        this.allMovies.push(movie); //  Adds new movie to Movies array
        this.moviesUpdated.next([...this.allMovies]); //  Returns copy of Movies array
      });

  }

  deleteMovie(id: string) {
    this.http
      .delete(environment.api_url + '/api/movies/' + id)
      .subscribe(() => {
        this.allMovies = this.allMovies.filter(movie => movie.id !== id);
        this.moviesUpdated.next([...this.allMovies]);
      });
  }

}
