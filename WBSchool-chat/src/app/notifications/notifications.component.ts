import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadNotifications } from '../store/actions/notifications.actions';
import { INotificationsState } from '../store/reducers/notifications.reducers';
import { selectNotifications } from '../store/selectors/notifications.selectors';
import { NotificationSocketService } from '../socket/notification-socket.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  public notificationsList$: Observable<INotificationsState> = this.store$.pipe(
    select(selectNotifications)
  );

  constructor(
    private store$: Store<INotificationsState>,
    private notificationSocketService: NotificationSocketService
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(loadNotifications());
  }

  removeNotification(id: string): void {
    this.notificationSocketService.deleteNotification(id);
  }

  clearNotifications(): void {
    this.notificationSocketService.clearNotifications();
  }
}
