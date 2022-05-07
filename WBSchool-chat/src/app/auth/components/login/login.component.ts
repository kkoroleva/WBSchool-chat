import { loadNotifications } from './../../../store/actions/notifications.actions';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  INewUser,
  IUserData,
  User,
} from '../../../../interfaces/auth-interface';
import { IAuthState } from '../../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { initAuth } from '../../../store/actions/auth.actions';
import { StorageMap } from '@ngx-pwa/local-storage';
import { addAuthNotification } from '../../../../app/store/actions/notifications.actions';
import { SocketService } from '../../../../app/socket/socket.service';
import { ConnectEvent } from '../../../../app/socket/event';
import { NotificationSocketService } from '../../../../app/socket/notification-socket.service';
import { INotification } from '../../../../interfaces/notifications-interface';
import { ThreadSocketService } from '../../../../app/socket/thread-socket.service';
import { MessageSocketService } from '../../../../app/socket/message-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted!: boolean;
  errorMessage: string = '';
  notificationAuth: INotification = {
    text: `Был выполнен вход в аккаунт.`,
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private store$: Store<IAuthState>,
    private storage: StorageMap,
    private socketService: SocketService,
    private notificationSocketService: NotificationSocketService,
    private threadSocketService: ThreadSocketService,
    private messageSocketService: MessageSocketService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(
          '^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .@]?[a-zA-Z0-9а-яёА-ЯЁ]*.?[a-zA-Z0-9а-яёА-ЯЁ]*$'
        ),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onEvent(ConnectEvent.CONNECT).subscribe(() => {
      console.log('connected');
      this.messageSocketService.initIoConnectionMessages();
      this.threadSocketService.initConnectThreads();
      this.notificationSocketService.initIoConnectionNotification();
    });
  }

  submit() {
    this.submitted = true;

    const user: User = {
      emailOrUser: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    let newUser: IUserData;

    this.auth
      .login(user)
      .pipe(
        catchError((error) => {
          this.auth.logout();
          this.errorMessage = error.error.message;
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (resp: INewUser) => {
          this.submitted = false;
          this.initIoConnection();
          this.router.navigate(['home']);
          newUser = resp.newUser;
          this.storage.set('user', newUser).subscribe(() => {});
          this.store$.dispatch(initAuth({ newUser }));
          this.notificationSocketService.createNotification(
            this.notificationAuth
          );
          this.store$.dispatch(
            addAuthNotification({ notification: this.notificationAuth })
          );
          this.store$.dispatch(loadNotifications());
        },
        error: () => {
          this.submitted = false;
        },
      });
  }
}
