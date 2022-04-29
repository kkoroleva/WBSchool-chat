import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    
    constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  sendFeedBack():void {
    this.dialog.open(FeedbackComponent, {
      panelClass: 'create-group-chat-modal',
      maxWidth: '100vw',
    });

  }

}
