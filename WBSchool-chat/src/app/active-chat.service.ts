import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveChatService {
  activeChatSubject: BehaviorSubject<string>;

  constructor() {
    const chatIDFromLocalStorage = localStorage.getItem('chatID');

    this.activeChatSubject = new BehaviorSubject<string>(
      chatIDFromLocalStorage
        ? chatIDFromLocalStorage
        : '625555ea8ef822301dab93c8'
    );
  }
}
