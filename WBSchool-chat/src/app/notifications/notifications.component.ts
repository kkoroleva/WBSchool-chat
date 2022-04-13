import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INotification } from '../store/reducers/notifications.reducers';
import { selectNotifications } from '../store/selectors/notifications.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(private store$: Store<INotification[]>) {}

  public notificationsList$: Observable<INotification[]> = this.store$.pipe(select(selectNotifications));

  notificationsList: INotification[] = [];

  getNotificationsList(): void {
    this.notificationsList$.subscribe((el) => {
      this.notificationsList = el
    })
  }

  deleteNotification(i: number): void {
    // this.notificationsList.slice(i, 1);
    // console.log(this.notificationsList)
  }

  ngOnInit(): void {
    this.getNotificationsList()
  }
}
