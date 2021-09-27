import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Movie} from '../../movies.model';
import {MoviesService} from '../../movies.service';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {SessionService} from '../../session.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {SearchResult} from '../../search/searchResult.model';
import {MatStepper} from '@angular/material/stepper';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-create-movie',
  templateUrl: 'create-movie.component.html',
  styleUrls: ['create-movie.component.css']
})
export class CreateMovieComponent implements OnInit, OnDestroy {
  myForm: FormGroup; // new Form obj to take output of formBuilder
  editing = {
    mode: null,
    movie: null
  }; //  Creating an obj for edit mode control
  @ViewChild(FormGroupDirective) form; // Instantiating this to be able to
  // clear form of errors after submitting
  // @ViewChild('title') titleField: ElementRef; //  Will store title element reference to focus on the field --NOT USED

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Array<string> = [];
  public selectedEntry: SearchResult;
  private savedSearchResult: Subscription;
  private editSub: Subscription;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(private fb: FormBuilder,
              public movieService: MoviesService,
              public sessionService: SessionService,
              private dialogRef: MatDialogRef<CreateMovieComponent>
  ) {
  } // Injecting Form Builder (to build forms) and
    // movieService (to be able to edit, add, delete movies)

  ngOnInit(): void {
    this.selectedEntry = null;
    this.myForm = this.fb.group({ // Use formBuilder to create a reactive form
      title: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      rating: null,
      description: null,
      savedSelection: null
    });
    this.editing.mode = false; // Set flag for edit mode to false
    // since 'edit' button has not been clicked
    this.editSub = this.movieService.getEditMovieUpdateListener() //  Created update listener for editing purposes
      .subscribe((movie: Movie[]) => { // Subscribe to editing obj.movie to hold movie to be edited
        if (movie != null) {
          this.editing.movie = movie[0]; //  when editing movie is received editing is filled with it
          // console.log(this.editing.movie);
          this.onEdit(); //  Call function to kick off editing flow
        }
      });
    this.movieService.getSearchResultSelected()
      .subscribe((sr: SearchResult) => {
        if (sr != null){
          this.selectedEntry = sr;
          this.nextStep();
          if (this.editing.mode !== true) {
            this.myForm.setValue({
              title: sr.Title, rating: '',
              description: '',
              savedSelection: sr });
          } else {
            this.myForm.setValue({
              title: sr.Title,
              rating: this.editing.movie.rating,
              description: this.editing.movie.description,
              savedSelection: sr });
          }
        }
      });
  }

  ngOnDestroy() { //  Added unsubscribe when component is deleted
    this.editSub.unsubscribe();
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();
    console.log(value);

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onEdit() {
    this.myForm.reset(); //  Reset the form
    // CAUSING Errors -> this.form.resetForm(); // Reset form errors
    this.editing.mode = true; //  Set editing mode to true
    this.myForm.setValue({ //  Fill form with editing values
      title: this.editing.movie.title,
      rating: (this.editing.movie.rating ? this.editing.movie.rating : null),
      description: this.editing.movie.description,
      savedSelection: (this.editing.movie.savedSearchResult ? this.editing.movie.savedSearchResult : null)
    });
    if (this.editing.movie.savedSearchResult != null){
      this.selectedEntry = this.editing.movie.savedSearchResult;
    }
    this.tags = (this.editing.movie.tags ? this.editing.movie.tags : null);
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
      // console.log(this.tags);
      // console.log(this.selectedEntry);
      this.movieService.addMovie( //  Send new movie to service
        form.value.title,
        form.value.rating,
        form.value.description,
        current.getTime(),
        this.sessionService.getUserId(),
        this.selectedEntry,
        this.tags);

      this.myForm.reset(); //  Reset the form
      this.form.resetForm(); // Reset form errors

      this.movieService.clearSearchResultSelected();

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
        this.editing.movie.dateEntered, //  Date entered
        current.getTime(), //  Date changed
        this.editing.movie.creator, //  ID of the user logged in
        this.selectedEntry,
        this.tags);

      this.editing.mode = false; //  Change edit mode to false
      this.myForm.reset(); //  Reset the form
      this.form.resetForm(); // Reset form errors
      this.dialogRef.close(); //  Close the dialog
      return null;
    }
  }

  onCancel() {
    while (this.myForm.value.title != null) {
      this.myForm.reset(); //  Reset the form
      this.form.resetForm(); // Reset form errors
    }
    this.editing.mode = false; //  Set editing mode to false
    this.dialogRef.close();
  }

  nextStep() {
    // this.stepper.selectedIndex = 1;
    this.stepper.next();
  }

}
