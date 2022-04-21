import { Component } from "@angular/core";
import { IMessage, User } from "./dialog";
import { ConnectEvent } from '../socket/event';
import { SocketService } from "../socket/socket.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent  {
  // messages: IMessage[] = [];
  // messageContent = '';
  // ioConnection: any;
  //
  // constructor(private socketService: SocketService) { }
  //
  // ngOnInit(): void {
  //   this.initIoConnection();
  // }
  //
  // private initIoConnection(): void {
  //   this.ioConnection = this.socketService.onMessage()
  //     .subscribe((message: IMessage) => {
  //       this.messages.push(message);
  //     });
  // }
}
