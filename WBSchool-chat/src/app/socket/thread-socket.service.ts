import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IComment } from '../../interfaces/thread-interface';
import { SocketService } from './socket.service';

export interface INewComment {
  chatId: string;
  threadId: string;
  comment: IComment
}

export interface IDeleteComment {
  chatId: string;
  threadId: string;
  authorId: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThreadSocketService {
  constructor(private socketService: SocketService, private store$: Store) {}

  public sendComment(
    chatId: string,
    threadId: string,
    comment: IComment
  ): void {
    this.socketService.socket.emit('comments:create', {
      chatId,
      threadId,
      comment,
    });
  }

  public deleteComment(
    chatId: string,
    threadId: string,
    authorId: string,
    date: string
  ): void {
    this.socketService.socket.emit('comments:delete', {
      chatId,
      threadId,
      authorId,
      date,
    });
  }

  public initConnectThreads() {
    this.onSendComment().subscribe((comment : INewComment) => {
      console.log("oncreate comment", comment)
      this.store$.dispatch(createComment({ comment: comment.comment }));
    });
    this.onDeleteComment().subscribe((comment: IDeleteComment) => {
      console.log("ondelete comment", comment)
      this.store$.dispatch(deleteComment({ comment }));
    });
    this.onUpdateComment().subscribe((comment: INewComment) => {
      console.log("onedit comment")
      this.store$.dispatch(editComment({ comment: comment.comment }));
    });
  }

  public updateComment(
    chatId: string,
    threadId: string,
    comment: IComment
  ): void {
    this.socketService.socket.emit('comments:update', {
      chatId,
      threadId,
      comment,
    });
  }

  public onSendComment(): Observable<INewComment> {
    return new Observable<INewComment>((observer) => {
      this.socketService.socket.on(
        'comments:create',
        (comment: INewComment) => {
          console.log('On create comment', comment);
          observer.next(comment);
        }
      );
    });
  }

  public onDeleteComment(): Observable<IDeleteComment> {
    return new Observable<IDeleteComment>((observer) => {
      this.socketService.socket.on(
        'comments:delete',
        (comment: IDeleteComment) => {
          console.log('On delete comment', comment);
          observer.next(comment);
        }
      );
    });
  }

  public onUpdateComment(): Observable<INewComment> {
    return new Observable<INewComment>((observer) => {
      this.socketService.socket.on(
        'comments:update',
        (comment: INewComment) => {
          console.log('On update comment', comment);
          observer.next(comment);
        }
      );
    });
  }

  public offComments() {
    this.socketService.socket.off('comments:create');
    this.socketService.socket.off('comments:update');
    this.socketService.socket.off('comments:delete');
  }
}
