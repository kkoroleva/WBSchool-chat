import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { User } from '../../user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted!: boolean;
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.value.password.reset();
      return
    }

    this.submitted = true;

    const user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.auth.login(user)
    .pipe(
      catchError((error) => {
        this.auth.logout();
        this.errorMessage = error.error.message;
        return throwError(() => error);
      })
    )
    .subscribe(() => {
      this.loginForm.reset();
      // this.router.navigate(['/dashboard']);
      this.submitted = false;
    },
    () => {
      this.submitted = false
    })
  }
}