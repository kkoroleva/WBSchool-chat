import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { ConnectEvent } from './event';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: any;
  constructor(
    @Inject('API_URL') readonly apiUrl: string,
    private auth: AuthService,
    private router: Router
  ) {}

  public initSocket(): void {
    if (localStorage.getItem('token')) {
      this.socket = socketIo.io(this.apiUrl, {
        path: '/api/socket',
        auth: { token: localStorage.getItem('token') },
      });
    } else if (!localStorage.getItem('token')) {
      this.auth.logout();
      // this.socket.offAny();
      this.router.navigateByUrl('/auth/login');
    }
  }

  public disconnect(): void {
    this.socket.offAny();
    console.log('Работает');
  }

  public onEvent(event: ConnectEvent): Observable<any> {
    return new Observable<Event>((observer) => {
      this.socket.on(event, () => observer.next());
    });
  }
}
