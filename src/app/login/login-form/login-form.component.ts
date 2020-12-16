import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onLogin(form: FormGroup) {
    // console.log(form);
    this.sessionService.login(this.loginForm.value.username, this.loginForm.value.password);
    /*.subscribe((response) => {

    });*/
    // this.router.navigate(['/home']);
    return null;
  }

}
