import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ChangeComponentService } from '../nav-mobile/change-component.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit {
  constructor(public changeState: ChangeComponentService) {}

  stateMessages = this.changeState.stateComponentMessages;

  onResized(event: ResizedEvent) {
    if (window.innerWidth >= 766) {
      this.stateMessages.groups = true;
      this.stateMessages.messanger = true;
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 766) {
      this.stateMessages.groups = false;
      this.stateMessages.messanger = false;
    } else {
      this.stateMessages.groups = true;
      this.stateMessages.messanger = true;
    }

    this.changeState.hasThreadsInNavMobile = false;
  }
}
