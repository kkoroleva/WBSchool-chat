import { Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ChangeComponentService } from '../navmobile/change-component.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  constructor(public changeState: ChangeComponentService) {}

  stateMain = this.changeState.stateComponentMain

  onResized(event: ResizedEvent) {
    if (window.innerWidth >= 766) {
      this.stateMain.groups = true
      this.stateMain.unreadMess = true
      this.stateMain.tetATet = true
      this.stateMain.threads = true
    }
  }

  ngOnInit(): void {
    if(window.innerWidth < 766) {
      this.stateMain.groups = true
      this.stateMain.unreadMess = false
      this.stateMain.tetATet = false
      this.stateMain.threads = false
    } else {
      this.stateMain.groups = true
      this.stateMain.unreadMess = true
      this.stateMain.tetATet = true
      this.stateMain.threads = true
    }

    this.changeState.hasThreadsInNavButtom = true
  }

}
