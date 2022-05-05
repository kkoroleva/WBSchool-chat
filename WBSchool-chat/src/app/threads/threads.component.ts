import { selectThread } from './../store/selectors/thread.selector';
import { initThread } from './../store/actions/threads.action';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, tap } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { ThreadSocketService } from '../socket/thread-socket.service';
import { selectChatGroup } from '../store/selectors/groups.selectors';
import { IComment, IThread } from './thread';

const mockThreads: IThread[] = [
  {
    _id: '123456',
    owner: '12345678909876543',
    ownerName: 'Kkoroleva',
    avatar:
      'https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg',
    isActive: true,
    basicPost: {
      date: '12/04/2022 12:44PM',
      imageOrFile:
        'https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg',
      text: 'Me, when I do not have to do layout with Material UI',
    },
    comments: [
      {
        authorID: '12345678909876543',
        authorName: 'Everyone',
        date: '14/04/2022 12:04PM',
        text: 'Funny. Not funny',
      },
      {
        authorID: '12345678909876543',
        authorName: 'Everyone',
        date: '14/04/2022 12:04PM',
        text: 'Funny. Not funny',
      },
      {
        authorID: '12345678909876543',
        authorName: 'Everyone',
        date: '14/04/2022 12:04PM',
        text: 'Funny. Not funny',
      },
    ],
  },
];
@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss'],
})
export class ThreadsComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper') wrapper!: ElementRef;

  toggle!: boolean;
  imgInput = false;
  commentControl = new FormControl('');
  imageOrFile = '';
  formatImage = '';
  threadsList: IThread[];
  username: string = '';
  idUser: string = '';
  threadId = '6272a27e6ee72e385c2dd141';
  chatId = '62726b2be1a28d1067ec647c';
  messageId = '6272a27e6ee72e385c2dd13f';
  avatar = '';
  isActive = false;
  basicPost = {
    date: '12/04/2022 12:44PM',
    imageOrFile:
      'https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg',
    text: 'Me, when I do not have to do layout with Material UI',
  };
  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  );

  public thread$: Observable<IThread> = this.store$.pipe(select(selectThread));

  constructor(
    private imageCompress: NgxImageCompressService,
    private serviceDialog: DialogService,
    private threadSocketService: ThreadSocketService,
    private store$: Store
  ) {
    this.threadsList = mockThreads;
  }

  ngOnInit(): void {
    this.getMyInfo(),
      tap((resp) => {
        setTimeout(() => {
          this.changeScroll();
        }, 300);
      });
    this.store$.dispatch(
      initThread({ chatId: this.chatId, messageId: this.messageId })
    );
    this.thread$.subscribe((thread) => {
      this.username = thread.ownerName!;
      this.avatar = thread.avatar!;
      this.isActive = thread.isActive!;
      this.formatImage = thread.formatImage!;
      // this.threadId = thread._id;
    });
    this.threadSocketService.initConnectThreads();
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
    if (this.commentControl.value.trim()) {
      this.changeScroll();
      this.chatGroup$.subscribe((chatId) => {
        if (this.imageOrFile.length > 0) {
          this.threadSocketService.sendComment(chatId, this.threadId, {
            text: this.commentControl.value,
            formatImage: this.formatImage,
            imageOrFile: this.imageOrFile,
          });
        } else {
          this.threadSocketService.sendComment(chatId, this.threadId, {
            text: this.commentControl.value,
          });
        }
      });
      this.commentControl.reset();
    }
  }

  ngOnDestroy(): void {
    this.threadSocketService.offComments();
  }
}
