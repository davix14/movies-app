import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Movie } from '../movies.model';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, public movieService: MoviesService) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: '',
      rating: '',
      description: ''
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid){ //  If form is invalid do nothing
      return;
    }
    const current = new Date();
    const newMovie: Movie = { //  Create new movie obj from form
      id: null,
      title: form.value.title,
      rating: form.value.rating,
      description: form.value.description,
      dateEntered: current.getTime()
    };
    console.log(newMovie);
    this.movieService.addMovie(newMovie); //  Send new movie to service
    this.myForm.reset(); //  Reset the form
    return null; //  Return null to prevent reloading page
  }

}
