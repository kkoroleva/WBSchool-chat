import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ChangeComponentService } from '../nav-mobile/change-component.service';
import { ThreadsService } from '../threads/threads.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit {
  isThreads: boolean = false;

  constructor(
    public changeState: ChangeComponentService,
    private threadService: ThreadsService
  ) {}

  stateMessages = this.changeState.stateComponentMessages;

  onResized(event: ResizedEvent) {
    if (window.innerWidth >= 766) {
      this.stateMessages.groups = true;
      this.stateMessages.messanger = true;
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('isThreads')) {
      this.isThreads = !!JSON.parse(localStorage.getItem('isThreads')!);
    }
    this.threadService.isThreads$.subscribe((isThreads) => {
      this.isThreads = isThreads;
    });

    if (window.innerWidth < 766) {
      this.stateMessages.groups = false;
      this.stateMessages.messanger = true;
    } else {
      this.stateMessages.groups = true;
      this.stateMessages.messanger = true;
    }

    this.changeState.hasThreadsInNavMobile = false;
  }
}
