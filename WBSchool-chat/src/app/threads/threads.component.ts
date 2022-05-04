import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { tap } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { MessageComponent } from '../dialog/messageDialog/message/message.component';
import { IComment, IThread } from './thread';
import { ThreadsService } from './threads.service';

const mockThread: IThread =
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
};


@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss'],
})
export class ThreadsComponent implements OnInit {
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('threads') threads!: ElementRef;

  isOpen: boolean = false;
  toggle!: boolean;
  imgInput = false;
  commentControl = new FormControl('');
  imageOrFile = '';
  formatImage = '';
  thread: IThread;
  username: string = '';
  idUser: string = '';

  constructor(
    private imageCompress: NgxImageCompressService,
    private serviceDialog: DialogService,
    private threadsService: ThreadsService) {

    const basicPost = this.threadsService.basicPost;
    this.thread = {
      ownerID: basicPost._id ? basicPost._id : 'ID unknown',
      ownerName: basicPost.username!,
      ownerThumbnail: basicPost.avatar!,
      isActive: false,
      basicPost: {
        date: basicPost.expiresIn!,
        text: basicPost.text,
        img: '',
      },
      comments: []
    }
    console.log(this.thread);
    // this.thread = mockThread;

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
      this.thread.comments.push(comment)
      this.commentControl.reset()

    }
  }

  itemFormat(item: string) {
    return !!(
      item.includes('.png') ||
      item.includes('.jpg') ||
      item.includes('.jpeg') ||
      item.includes('.svg') ||
      item.includes('.gif')
    );
  }

  separateTheLink(message: string) {
    let str = message.trim();
    let strArr = str.split(' ');
    let pic = '';
    strArr.forEach(word => {
      if (this.itemFormat(word)) {
        pic = word;
        strArr.splice(strArr.indexOf(word), 1);
      }
    });
    return { url: pic, text: strArr.join(' ') };
  }

  @Output() onClosed = new EventEmitter<boolean>();
  closeThreadComponent(): void {
    this.onClosed.emit(this.isOpen);
  }
}
