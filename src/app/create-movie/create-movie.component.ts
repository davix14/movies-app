import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Movie} from '../movies.model';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  myForm: FormGroup; // new Form obj to take output of formBuilder

  constructor(private fb: FormBuilder, public movieService: MoviesService) {
  } // Injecting Form Builder

  ngOnInit(): void {
    this.myForm = this.fb.group({ // Use formBuilder to create a reactive form
      title: ['', [
        Validators.required,
        Validators.minLength(1)
      ]], // TODO Add validations
      rating: '', // TODO Add validations
      description: ''// TODO Add validations
    });
  }

  onSubmit(form: FormGroup) { // Method to handle the form submission IN: Form OUT: void
    if (form.invalid) { //  If form is invalid do nothing
      return;
    }
    const current = new Date(); // Create date obj for Timestamp
    const newMovie: Movie = { //  Create new movie obj from form
      id: null,
      title: form.value.title,
      rating: form.value.rating,
      description: form.value.description,
      dateEntered: current.getTime()
    };
    // console.log(newMovie); // FR DEBUG: Log to the new obj to console
    this.movieService.addMovie(newMovie); //  Send new movie to service
    this.myForm.reset(); //  Reset the form
    return null; //  Return null to prevent reloading page
  }

}
