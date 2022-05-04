import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ChangeComponentService } from '../nav-mobile/change-component.service';

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
      this.stateMain.tetATet = true
      this.stateMain.threads = true
    }
  }


  @ViewChild('homePage') homePage!: ElementRef;
  onClosed(isClosed: boolean) {
    let pageStyles = this.homePage.nativeElement.style;
    pageStyles.gridTemplateColumns = 'minmax(300px, 500px)';

    //this.threads.nativeElement.style.display = 'none';
  }

  ngOnInit(): void {
    if(window.innerWidth < 766) {
      this.stateMain.groups = true
      this.stateMain.tetATet = false
      this.stateMain.threads = false
    } else {
      this.stateMain.groups = true
      this.stateMain.tetATet = true
      this.stateMain.threads = true
    }

    this.changeState.hasThreadsInNavMobile = true
  }

}
