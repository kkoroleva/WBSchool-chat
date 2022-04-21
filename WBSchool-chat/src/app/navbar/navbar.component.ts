import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, State, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { INewUser, IUserData } from '../auth/interfaces';
import { AuthService } from '../auth/services/auth.service';
import { loadGroups } from '../store/actions/groups.actions';
import { loadNotifications } from '../store/actions/notifications.actions';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { INotificationsState } from '../store/reducers/notifications.reducers';
import { selectUser } from '../store/selectors/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  path: string = window.location.pathname.substring(1);
  constructor(
    private auth: AuthService,
    private router: Router,
    private store$: Store<INotificationsState | IGroupsState>
  ) {}

  public userState$: Observable<IUserData> = this.store$.pipe(
    select(selectUser)
  );

  loadGroups(): void {
    this.store$.dispatch(loadGroups());
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  getImgFromBase64(imgStr: string): string {
    if (!imgStr) {
      return '../../assets/image-not-found.jpg';
    }
    return atob(imgStr);
  }

  ngDoCheck() {
    this.path = window.location.pathname.substring(1);
  }
}
