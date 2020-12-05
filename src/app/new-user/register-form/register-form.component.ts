import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../session.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', {validators: [Validators.minLength(3), Validators.required]}],
      name: ['', {validators: [Validators.required, Validators.minLength(3)]}]
    });
  }

  registerUser(userForm: FormGroup) {
    if (!userForm.valid) {
      return null;
    } else {
      // TODO Add call to User Service to add new user to DB
      const current = new Date(); // Create date obj for Timestamp
      this.sessionService.registerUser(
        userForm.value.name,
        userForm.value.username,
        current.getTime()
      );
    }
  }

}
