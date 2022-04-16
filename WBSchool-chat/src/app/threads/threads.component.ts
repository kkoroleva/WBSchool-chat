import { Component, OnInit } from '@angular/core';
import { IThread } from './thread';

const mockThreads: IThread[] = [
  {
    ownerID: '12345678909876543',
    ownerName: 'Kkoroleva',
    ownerThumbnail: 'https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg',
    isActive: true,
    basicPost: {
      date: '12/04/2022 12:44PM',
      img: 'https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg',
      text: 'Me, when I do not have to do layout with Material UI',
    },
    comments: [
      {
        authorID: '12345678909876543',
        authorName: 'Everyone',
        post: {
          date: '14/04/2022 12:04PM',
          text: 'Funny. Not funny'
        }
      },
      {
        authorID: '12345678909876543',
        authorName: 'Everyone',
        post: {
          date: '14/04/2022 12:04PM',
          text: 'Funny. Not funny'
        }
      },
      {
        authorID: '12345678909876543',
        authorName: 'Everyone',
        post: {
          date: '14/04/2022 12:04PM',
          text: 'Funny. Not funny'
        }
      },
    ],
  },
];

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss']
})
export class ThreadsComponent implements OnInit {

  threadsList: IThread[];

  constructor() {
    this.threadsList = mockThreads;
  }

  ngOnInit(): void {
  }

}
