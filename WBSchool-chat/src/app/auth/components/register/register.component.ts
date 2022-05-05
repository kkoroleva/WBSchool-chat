import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../interfaces/auth-interface';

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
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$')]),
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*\.?[a-zA-Z0-9а-яёА-ЯЁ]*$')]),
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
      this.router.navigateByUrl('/auth/login');
      this.submitted = false;
    },
    () => {
      this.submitted = false
    })
  }
}
