import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { State, Store } from '@ngrx/store';
import {AuthService} from '../auth/services/auth.service';
import { loadGroups } from '../store/actions/groups.actions';
import { loadNotifications } from '../store/actions/notifications.actions';
import { IGroupsState } from '../store/reducers/groups.reducers';
import { INotificationsState } from '../store/reducers/notifications.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  path: string = window.location.pathname.substring(1);
  constructor(private auth: AuthService, private router: Router, private store$: Store<INotificationsState | IGroupsState>) {}

  loadGroups(): void {
    this.store$.dispatch(loadGroups());
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.auth.logout()
    this.router.navigate(["login"])
  }

  ngDoCheck() {
    this.path = window.location.pathname.substring(1);
  }
}
