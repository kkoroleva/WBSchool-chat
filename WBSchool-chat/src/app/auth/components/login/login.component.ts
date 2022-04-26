import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { INewUser, IUserData, User } from '../../interfaces';
import { IAuthState } from '../../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { initAuth } from '../../../store/actions/auth.actions';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted!: boolean;
  errorMessage: string = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private store$: Store<IAuthState>,
    private storage: StorageMap
    ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(
          '^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*\.?[a-zA-Z0-9а-яёА-ЯЁ]*$'
        ),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {

    this.submitted = true;

    const user: User = {
      emailOrUser: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    let newUser: IUserData;

    this.auth.login(user)
    .pipe(
      catchError((error) => {
        this.auth.logout();
        this.errorMessage = error.error.message;
        return throwError(() => error);
      })
    )
    .subscribe(
      (resp: INewUser) => {
        this.submitted = false;
        this.router.navigate(['home']);
        newUser = resp.newUser;
        this.storage.set('user', newUser).subscribe(() => {});
        this.store$.dispatch(initAuth({newUser}));
      },
      () => {
        this.submitted = false;
      });
  }
}
