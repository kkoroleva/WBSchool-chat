import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted!: boolean;
  errorMessage: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .]{0,1}[[a-zA-Z0-9а-яёА-ЯЁ]*')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      repeatPassword: new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.value.password.reset();
      return
    }

    this.submitted = true;

    const user: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email
    }

    this.auth.register(user)
    .pipe(
      catchError((error) => {
        this.auth.logout();
        this.errorMessage = error.error.message;
        return throwError(() => error);
      })
    )
    .subscribe(() => {
      this.registerForm.reset();
      alert(`Now you can login with your username or email, ${localStorage.getItem('email')}`)
      this.router.navigate(['login']);
      this.submitted = false;
    },
    () => {
      this.submitted = false
    })
  }
}