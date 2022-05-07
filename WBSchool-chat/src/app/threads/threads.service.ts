import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IMessage } from '../dialog/dialog';
import { IThread } from './thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  isThreads$ = new BehaviorSubject<boolean>(!!JSON.parse(localStorage.getItem('isThreads')!)||false);

  constructor() {
  }

}
