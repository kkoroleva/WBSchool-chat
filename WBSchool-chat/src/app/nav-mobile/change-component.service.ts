import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeComponentService {
  stateComponentMain = {
    groups: true,
    tetATet: true,
    threads: true
  };

  stateComponentMessages = {
    groups: true,
    messanger: true
  };

  hasThreadsInNavMobile!: boolean
}
