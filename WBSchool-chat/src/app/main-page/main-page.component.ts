import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';

interface ICountry {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  @ViewChild('sortID') sortID!: ElementRef;

  urlGitHub = "https://github.com/kkoroleva/WBSchool-chat";

  country: ICountry[] = [
    {
      value: 'RUS', viewValue: 'RUS'
    },
    {
      value: 'ENG', viewValue: 'ENG'
    }
  ]
 

  valueControl = new FormControl(JSON.parse(localStorage.getItem('languageSelector')!) || 0);

  constructor(public dialog: MatDialog) {

    console.log(localStorage.getItem('languageSelector'), "this")
  }

  ngOnInit(): void {
    this.valueControl.valueChanges.subscribe(
      (element: number) => {
        localStorage.setItem('languageSelector', JSON.stringify(element))
      }
    )
  }

  sendFeedBack(): void {
    this.dialog.open(FeedbackComponent, {
      panelClass: 'feedback-modal',
      maxWidth: '100%',
    });
  }
  gitHub() {
    window.open(this.urlGitHub)
  }

}
