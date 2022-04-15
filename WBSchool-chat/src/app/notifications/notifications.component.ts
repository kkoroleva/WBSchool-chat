import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  clearNotifications,
  removeNotifications,
} from '../store/actions/notifications.actions';
import { INotificationsState } from '../store/reducers/notifications.reducers';
import { selectNotifications } from '../store/selectors/notifications.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notificationsList: INotificationsState = { notifications: [] };

  public notificationsList$: Observable<INotificationsState> = this.store$.pipe(
    select(selectNotifications)
  );

  constructor(private store$: Store<INotificationsState>) {}

  ngOnInit(): void {
    this.getNotificationsList();
  }

  getNotificationsList(): void {
    this.notificationsList$.subscribe((el) => {
      this.notificationsList = el;
    });
  }

  removeNotification(): void {
    this.store$.dispatch(removeNotifications());
  }

  clearNotifications(): void {
    this.store$.dispatch(clearNotifications());
  }
}
