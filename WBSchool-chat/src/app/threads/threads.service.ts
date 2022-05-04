import { Injectable } from '@angular/core';
import { IMessage } from '../dialog/dialog';
import { IThread } from './thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {

  basicPost: IMessage = {
    text: '',
  };
  constructor() { }

  createThread(message: IMessage) {
    this.basicPost = message;
    console.log(this.basicPost.avatar);
  }
}
