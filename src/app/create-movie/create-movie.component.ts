import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Movie} from '../movies.model';
import {MoviesService} from '../movies.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit, OnDestroy {
  myForm: FormGroup; // new Form obj to take output of formBuilder
  editing = {
    mode: null,
    movie: null
  }; //  Creating an obj for edit mode control
  @ViewChild(FormGroupDirective) form; // Instantiating this to be able to
  // clear form of errors after submitting
  private editSub: Subscription;

  constructor(private fb: FormBuilder, public movieService: MoviesService) {
  } // Injecting Form Builder (to build forms) and
    // movieService (to be able to edit, add, delete movies)

  ngOnInit(): void {
    this.myForm = this.fb.group({ // Use formBuilder to create a reactive form
      title: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      rating: '',
      description: ''
    });
    this.editing.mode = false; // Set flag for edit mode to false
    // since 'edit' button has not been clicked
    this.editSub = this.movieService.getEditMovieUpdateListener() //  Created update listener for editing purposes
      .subscribe((movie: Movie[]) => { // Subscribe to editing obj.movie to hold movie to be edited
        this.editing.movie = movie[0]; //  when editing movie is receieved editing is filled with it
        console.log(this.editing.movie);
        this.onEdit(); //  Call function to kick off editing flow
      });
  }

  ngOnDestroy() { //  Added unsubcribe when component is deleted
    this.editSub.unsubscribe();
  }

  onEdit() {
    this.myForm.reset(); //  Reset the form
    this.form.resetForm(); // Reset form errors
    this.editing.mode = true; //  Set editing mode to true
    this.fillFormForEditing(); //  Fill form with editing values
  }

  fillFormForEditing() {
    this.form.title.value = this.editing.movie.title;
    // this.form.rating.value = this.editing.movie.rating;
    this.form.description.value = this.editing.movie.description;
  }

  onSubmit(form: FormGroup) { // Method to handle the form submission IN: Form OUT: void
    if (form.invalid) { //  If form is invalid do nothing
      return;
    }
    const current = new Date(); // Create date obj for Timestamp
    /*this.formattedDate = new Date(); method to get a cleaner formatted time
    this.formattedDate.toString(current.getTime());*/

    // console.log(form.value); // FR DEBUG: Log to the new obj to console

    this.movieService.addMovie( //  Send new movie to service
      form.value.title,
      form.value.rating,
      form.value.description,
      current.getTime());

    this.myForm.reset(); //  Reset the form
    this.form.resetForm(); // Reset form errors

    /*Object.keys(this.myForm.controls).forEach(key => { ONE WAY OF RESETTING FORM ERRORS
      this.myForm.controls[key].setErrors(null);*/

    return null; //  Return null to prevent reloading page
  }

}
