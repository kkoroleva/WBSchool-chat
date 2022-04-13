import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { clear } from '../store/actions/notifications.actions';
import { INotifications } from '../store/reducers/notifications.reducers';
import { selectNotifications } from '../store/selectors/notifications.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(private store$: Store<INotifications>) {}

  public notificationsList$: Observable<INotifications> = this.store$.pipe(
    select(selectNotifications)
  );

  notificationsList: INotifications = { notifications: [] };

  getNotificationsList(): void {
    this.notificationsList$.subscribe((el) => {
      this.notificationsList = el;
    });
  }

  deleteNotifications(): void {
    this.store$.dispatch(clear());
  }

  ngOnInit(): void {
    this.getNotificationsList();
  }
}
