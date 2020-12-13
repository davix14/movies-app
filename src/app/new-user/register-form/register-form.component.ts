import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../session.service';
import {User} from '../../user.model';

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
      name: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      password: ['', {validators: [Validators.required, Validators.minLength(3)]}]
    });
    this.sessionService.getUserUpdated()
      .subscribe((user: User) => {
        if (user != null) {
          this.registerForm.reset();
          this.router.navigate(['']);
        } else {

        }
      });
  }

  registerUser(userForm: FormGroup) {
    if (!userForm.valid) {
      return null;
    } else {
      const current = new Date(); // Create date obj for Timestamp
      const success: boolean = this.sessionService.registerUser(
        userForm.value.name,
        userForm.value.username,
        current.getTime()
      );
      /*if (success){
      this.registerForm.reset();
      } else {
        console.log('Registration FAILED');
      }*/
    }
  }

}
