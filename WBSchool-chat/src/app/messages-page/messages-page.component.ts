import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../threads/threads.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],

})
export class MessagesPageComponent implements OnInit {
  isThreads: boolean = false;
  navMobile: string = 'groups';

  constructor(private threadService: ThreadsService) {}


  ngOnInit(): void {
    if (localStorage.getItem('navMobileMessage')) {
      this.navMobile = localStorage.getItem('navMobileMessage')!;
    }

    if (localStorage.getItem('isThreads')) {
      this.isThreads = !!JSON.parse(localStorage.getItem('isThreads')!);
    }
    this.threadService.isThreads$.subscribe((isThreads) => {
      this.isThreads = isThreads;
    }
    );
  }

}
