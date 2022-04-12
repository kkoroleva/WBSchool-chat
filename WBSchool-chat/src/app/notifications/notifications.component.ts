import { Component, OnInit } from '@angular/core';
import { INotification } from '../notifications/interface';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  deleteNotification(): void {}

  ngOnInit(): void {
  }

  arrNotifications: Array<INotification> = [
    {
      expiresIn: '21.01.2022',
      text: 'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.'
    },
    {
      expiresIn: '22.01.2022',
      text: 'So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through the skin, but no, it would not cause intoxication.'
    },
    {
      expiresIn: '23.01.2022',
      text: 'How a visual artist redefines success in graphic design'
    },
    {
      expiresIn: '24.01.2022',
      text: 'ID: 22739'
    }
  ]

}
