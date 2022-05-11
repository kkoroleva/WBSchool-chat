import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  isThreads$ = new BehaviorSubject<boolean>(!!JSON.parse(localStorage.getItem('isThreads')!)||false);

  constructor() {
  }

}
