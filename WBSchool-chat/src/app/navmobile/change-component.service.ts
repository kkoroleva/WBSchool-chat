import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeComponentService {
  stateComponentMain = {
    groups: true,
    unreadMess: true,
    tetATet: true,
    threads: true
  };

  stateComponentMessages = {
    groups: true,
    unreadMess: true,
    messanger: true
  };

  hasThreadsInNavButtom!: boolean
}
