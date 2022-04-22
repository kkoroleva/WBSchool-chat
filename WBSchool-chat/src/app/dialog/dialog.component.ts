import { Component } from "@angular/core";
import { IMessage, User } from "./dialog";
import { ConnectEvent } from '../socket/event';
import { SocketService } from "../socket/socket.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent  {}
