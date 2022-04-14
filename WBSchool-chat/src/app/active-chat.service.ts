import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveChatService {
  activeChatSubject = new BehaviorSubject<string>('625555ea8ef822301dab93c8');

  constructor() {}
}
