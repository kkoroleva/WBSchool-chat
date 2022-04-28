import {
  pushToNotification,
  changeLoadNotifications,
} from './../store/actions/notifications.actions';
import { INotification } from './../store/reducers/notifications.reducers';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';
import {
  clearNotifications,
  loadNotifications,
  removeNotification,
} from '../store/actions/notifications.actions';
import { INotificationsState } from '../store/reducers/notifications.reducers';
import { selectNotifications } from '../store/selectors/notifications.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  // notificationsList: INotificationsState = { notifications: [] };

  public notificationsList$: Observable<INotificationsState> = this.store$.pipe(
    select(selectNotifications)
  );

  constructor(
    private store$: Store<INotificationsState>,
    private socketService: SocketService
  ) {}

  private initIoConnection(): void {
    this.socketService
      .onCreateNotification()
      .subscribe((notification: INotification) => {
        this.store$.dispatch(pushToNotification({ notification }));
      });
    this.socketService
      .onDeleteNotification()
      .subscribe((notificationId: string) => {
        this.store$.dispatch(removeNotification({ id: notificationId }));
      });
    this.socketService
      .onClearNotifications()
      .subscribe((notifications: INotification[]) => {
        this.store$.dispatch(changeLoadNotifications({ notifications }));
      });
  }

  ngOnInit(): void {
    this.initIoConnection();
    this.store$.dispatch(loadNotifications());
  }

  removeNotification(id: string): void {
    this.socketService.deleteNotification(id);
    // this.store$.dispatch(removeNotification({ id }));
  }

  clearNotifications(): void {
    this.socketService.clearNotifications();
    // this.store$.dispatch(clearNotifications());
  }
}
