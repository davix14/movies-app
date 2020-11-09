import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: '',
      description: '',
      rating: ''
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  onSubmit(form: FormGroup) {
    console.log(form);
    return null;
  }

}
