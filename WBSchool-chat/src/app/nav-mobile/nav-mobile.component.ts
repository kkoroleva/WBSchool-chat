import { Component } from '@angular/core';
import { ChangeComponentService } from './change-component.service';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})
export class NavMobileComponent {

  constructor(public changeState: ChangeComponentService) {}

  stateMain = this.changeState.stateComponentMain
  stateMessages = this.changeState.stateComponentMessages

  openGroup(): void {
    this.stateMain.groups = true
    this.stateMain.tetATet = false
    this.stateMain.threads = false

    this.stateMessages.groups = true
    this.stateMessages.messanger = false
  }

  openUnreadMess(): void {
    this.stateMain.groups = false
    this.stateMain.tetATet = false
    this.stateMain.threads = false

    this.stateMessages.groups = false
    this.stateMessages.messanger = false
  }

  openTetATet(): void {
    this.stateMain.groups = false
    this.stateMain.tetATet = true
    this.stateMain.threads = false

    this.stateMessages.groups = false
    this.stateMessages.messanger = true
  }

  openThreads(): void {
    this.stateMain.groups = false
    this.stateMain.tetATet = false
    this.stateMain.threads = true
  }
}
