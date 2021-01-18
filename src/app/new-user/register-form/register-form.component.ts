import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../session.service';
import {User} from '../../user.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private sessionService: SessionService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', {validators: [Validators.minLength(3), Validators.required]}],
      name: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      password: ['', {validators: [Validators.required, Validators.minLength(3)]}]
    });
    /*this.sessionService.getUserUpdated()
      .subscribe((user: User) => {
        if (user != null) {
          // console.log(user);
          this.registerForm.reset();
          this.router.navigate(['']);
        } else {

        }
      });*/
    // this.sessionService.getLatestError()
    //   .subscribe((error) => {
    //     if (error != null) {
    //       console.log(error.error.message);
    //       const snackBarRef = this.snackBar
    //         .open(
    //           error.error.message,
    //           'Dismiss',
    //           {
    //             duration: 5000,
    //             horizontalPosition: 'center',
    //             verticalPosition: 'bottom'
    //           });
    //       snackBarRef.onAction()
    //         .subscribe(() => {
    //           // console.log('Action USED!');
    //         })
    //       snackBarRef.containerInstance._onExit
    //         .subscribe(() => {
    //           this.sessionService.resetLatestError();
    //         });
    //     }
    //   });

  }

  registerUser(userForm: FormGroup) {
    if (!userForm.valid) {
      return null;
    } else {
      const current = new Date(); // Create date obj for Timestamp
      this.sessionService.registerUser(
        userForm.value.name,
        userForm.value.username,
        userForm.value.password,
        current.getTime()
      )
        .subscribe((responseData) => {
          if (responseData.success === true) {
            console.log('User successfully added');
            this.registerForm.reset();
            this.router.navigate(['']);
          }
        }, (error) => {
          // console.log(error);
          // console.log(error.error.message);
          const snackBarRef = this.snackBar
            .open(
              'Error Adding New User',
              'Dismiss',
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
          snackBarRef.onAction()
            .subscribe(() => {
              // console.log('Action USED!');
            });
          snackBarRef.containerInstance._onExit
            .subscribe(() => {
              this.sessionService.resetLatestError();
            });
        });
    }
  }

}
