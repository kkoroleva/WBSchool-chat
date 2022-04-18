import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';
import { IAuth, IAuthState, ISuccessAuth } from 'src/app/store/reducers/auth.reducers';
import { select, Store } from '@ngrx/store';
import { initAuth } from 'src/app/store/actions/auth.actions';
import { selectSuccessUser } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted!: boolean;
  errorMessage: string = '';
  public userSuccessAuthStore$: Observable<ISuccessAuth> = this.store$.pipe(select(selectSuccessUser));

  constructor(
    private auth: AuthService, 
    private router: Router,
    private store$: Store<IAuthState>
    ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(
          '^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*$'
        ),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {
    // if (this.loginForm.invalid) {
    //   this.loginForm.value.password.reset();
    //   return;
    // }

    this.submitted = true;

    const user: User = {
      emailOrUser: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.store$.dispatch(initAuth( {user} ))

    if (localStorage.getItem('token')) {
      this.userSuccessAuthStore$
      .pipe(
        catchError((error) => {
          this.auth.logout();
          this.errorMessage = error.error.message;
          return throwError(() => error);
        })
      )
      .subscribe(
        () => {
          this.loginForm.reset();
          alert(`Welcome to the club, ${localStorage.getItem('username')}`);
          this.router.navigate(['home']);
          this.submitted = false;
        },
        () => {
          this.submitted = false;
        }
      );
    }
    console.log(this.userSuccessAuthStore$)
    
  }
}
