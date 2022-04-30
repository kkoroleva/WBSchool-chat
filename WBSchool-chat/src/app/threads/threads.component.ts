import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { tap } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { MessageComponent } from '../dialog/messageDialog/message/message.component';
import { IComment, IThread } from './thread';

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
  styleUrls: ['./threads.component.scss'],
})
export class ThreadsComponent implements OnInit {
  @ViewChild('wrapper') wrapper!: ElementRef;

  toggle!: boolean;
  imgInput = false;
  commentControl = new FormControl('');
  imageOrFile = '';
  formatImage = '';
  threadsList: IThread[];
  username: string = '';
  idUser: string = '';

  constructor(private imageCompress: NgxImageCompressService,
    private serviceDialog: DialogService) {
    this.threadsList = mockThreads;
  }
  ngOnInit(): void {
    this.getMyInfo(),
      tap((resp) => {
        setTimeout(() => {
          this.changeScroll();
        }, 300);
      });
  }
  getMyInfo() {
    this.serviceDialog.getMyInfo().subscribe((item) => {
      this.username = item.username;
      this.idUser = item._id;
    });
  }
  addImage(input: any) {
    let imageOrFile = '';
    let reader = new FileReader();
    let file = input.files[0];
    reader.onloadend = () => {
      if (typeof reader.result == 'string') {
        imageOrFile = reader.result;
        if (+this.imageCompress.byteCount(reader.result) > 1048576) {
          this.imageCompress
            .compressFile(imageOrFile, -1, 50, 50, 800, 600)
            .then((result) => {
              this.imageOrFile = result.slice(imageOrFile.indexOf(',') + 1);
              this.formatImage = result.slice(0, imageOrFile.indexOf(',') + 1);
            });
        } else {
          this.imageOrFile = imageOrFile.slice(imageOrFile.indexOf(',') + 1);
          this.formatImage = imageOrFile.slice(0, imageOrFile.indexOf(',') + 1);
        }
      } else {
        alert('Вы отправляете не картинку!');
      }
    };
    reader.readAsDataURL(file);
  }

  onImgAdd() {
    this.imgInput = true;
  }

  greenBtnClick(input: any) {
    this.addImage(input);
    this.toggle = !this.toggle;
  }

  redBtnClick() {
    this.toggle = !this.toggle;
    this.imageOrFile = '';
    this.imgInput = false;
  }
  sendFileComments() {
    this.toggle = true;
  }
  changeScroll(): void {
    if (this.wrapper) {
      this.wrapper.nativeElement.scrollTop =
        this.wrapper.nativeElement.scrollHeight;
    }
  }
  sendComments() {
    if (
      this.commentControl.value.trim() ||
      (this.commentControl.value.trim() && this.imageOrFile.length > 0)
    ) {
      this.changeScroll();
      let comment: IComment = {
        authorID: this.idUser,
        authorName: this.username,
        post: {
          date: '28/04/2022 17:04PM',
          img: undefined,
          text: this.commentControl.value
        }
      }
      this.threadsList[0].comments.push(comment)
      this.commentControl.reset()

    }
  }
}
