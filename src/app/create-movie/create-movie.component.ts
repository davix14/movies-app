import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Movie} from '../movies.model';
import {MoviesService} from '../movies.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

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
  @ViewChild('title') titleField: ElementRef; //  Will store title element reference

  private editSub: Subscription;

  constructor(private fb: FormBuilder,
              public movieService: MoviesService,
              public rtr: Router, private dialogRef: MatDialogRef<CreateMovieComponent>
  ) {
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
        if (movie != null) {
          this.editing.movie = movie[0]; //  when editing movie is receieved editing is filled with it
          // console.log(this.editing.movie);
          this.onEdit(); //  Call function to kick off editing flow
        }
      });
  }

  ngOnDestroy() { //  Added unsubcribe when component is deleted
    this.editSub.unsubscribe();
  }

  onEdit() {
    this.myForm.reset(); //  Reset the form
    // CAUSING Errors -> this.form.resetForm(); // Reset form errors
    this.editing.mode = true; //  Set editing mode to true
    this.myForm.setValue({ //  Fill form with editing values
      title: this.editing.movie.title,
      rating: this.editing.movie.rating,
      description: this.editing.movie.description
    });
    // CAUSING Errors -> this.titleField.nativeElement.focus(); //  Focus on title field
  }

  onSubmit(form: FormGroup) { // Method to handle the form submission IN: Form OUT: void
    if (form.invalid) { //  If form is invalid do nothing
      return;
    }
    const current = new Date(); // Create date obj for Timestamp

    if (this.editing.mode !== true) {
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
      this.dialogRef.close();
      return null; //  Return null to prevent reloading page
    } else { //  In editing Mode
      this.movieService.sendEditMovie( //  Send new movie to service
        this.editing.movie.id,
        form.value.title,
        form.value.rating,
        form.value.description,
        current.getTime());

      this.editing.mode = false; //  Change edit mode to false
      this.myForm.reset(); //  Reset the form
      this.form.resetForm(); // Reset form errors
      if (this.rtr.url === '/create') {
        this.rtr.navigate(['list']); //  Navigate back to List page
      }
      this.dialogRef.close();
      return null;
    }
  }

  onCancel() {
    while (this.myForm.value.title != null) {
      this.myForm.reset(); //  Reset the form
      this.form.resetForm(); // Reset form errors
    }
    this.editing.mode = false; //  Set editing mode to false
    this.movieService.cancelEditMovie();
    this.dialogRef.close();
  }

}
