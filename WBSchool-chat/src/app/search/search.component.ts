import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private socketService: SocketService) {}

  blankClick(): void {
    console.log('click');
  }

  ngOnInit() {
    this.socketService.offNotifications();
    this.socketService.initIoConnectionNotification();
  }
}
