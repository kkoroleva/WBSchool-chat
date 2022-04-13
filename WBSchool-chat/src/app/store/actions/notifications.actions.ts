import { Action } from '@ngrx/store';

export enum notificationsActionsType {
  load = '[NOTIFICATIONS] load',
  delete = '[NOTIFICATIONS] delete',
}

export class LoadNotificationsAction implements Action {
  readonly type = notificationsActionsType.load;
}

export class DeleteNotificationsAction implements Action {
  readonly type = notificationsActionsType.delete;
}

export type NotificationsActions =
  | LoadNotificationsAction
  | DeleteNotificationsAction;
