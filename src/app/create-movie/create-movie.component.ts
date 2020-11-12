import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Movie} from '../movies.model';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  myForm: FormGroup; // new Form obj to take output of formBuilder
  editing: any = {
    mode: null,
    movie: {}
  };
  @ViewChild(FormGroupDirective) form; // Instantiating this to be able to
                                        // clear form of errors after submitting

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
  }

  onEdit() {
    this.editing.mode = true;
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
