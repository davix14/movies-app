import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../session.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              public router: Router,
              public sessionService: SessionService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',
        [Validators.required,
          Validators.minLength(3)]],
      password: ['',
        [Validators.required,
          Validators.minLength(3)]]
    });
    this.sessionService.getLatestError()
      .subscribe((error) => {
        if (error != null) {
          console.log(error.error.message);
          const snackBarRef = this.snackBar
            .open(
              error.error.message,
              'Dismiss',
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
          snackBarRef.onAction()
            .subscribe(() => {
              // console.log('Action USED!');
            });
          snackBarRef.containerInstance._onExit
            .subscribe(() => {
              this.sessionService.resetLatestError();
            });
        }
      });
  }

  onLogin(form: FormGroup) {
    if (form.valid) {
      // console.log(form);
      this.sessionService.login(
        this.loginForm.value.username,
        this.loginForm.value.password);
      /*.subscribe((response) => {

      });*/
      // this.router.navigate(['/home']);
    }
    return null;
  }

}
