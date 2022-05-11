import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { selectThread } from '../store/selectors/thread.selector';
import { initThread } from '../store/actions/threads.action';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, tap } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';
import { ThreadSocketService } from '../socket/thread-socket.service';
import { selectChatGroup } from '../store/selectors/groups.selectors';
import { selectMessage } from '../store/selectors/thread.selector';
import { ThreadsService } from './threads.service';
import { IMessage } from '../../interfaces/dialog-interface';

import { IThread } from '../../interfaces/thread-interface';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadsComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('threads') threads!: ElementRef;

  isOpen: boolean = false;
  toggle!: boolean;
  imgInput = false;
  commentControl = new FormControl('');
  imageOrFile = '';
  formatImage = '';
  username: string = '';
  idUser: string = '';

  threadId = '';

  chatId = '';
  messageId = '';

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

  public basicPostThread$: Observable<IMessage> = this.store$.pipe(
    select(selectMessage)
  );

  public thread$: Observable<IThread> = this.store$.pipe(select(selectThread));

  constructor(
    private imageCompress: NgxImageCompressService,
    private serviceDialog: DialogService,
    private threadSocketService: ThreadSocketService,
    private store$: Store,
    private threadsService: ThreadsService
  ) {}

  ngOnInit(): void {
    this.getMyInfo(),
      tap((resp) => {
        setTimeout(() => {
          this.changeScroll();
        }, 300);
      });

    this.basicPostThread$.subscribe((bp) => {
      if (bp.chatId) {
        this.store$.dispatch(
          initThread({ chatId: bp.chatId!, messageId: bp._id! })
        );
      }
    });

    this.thread$.subscribe((thread) => {
      this.username = thread.ownerName!;
      this.avatar = thread.avatar!;
      this.isActive = thread.isActive!;
      this.formatImage = thread.formatImage!;

      this.threadId = thread._id;
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

  closeThreadComponent(): void {
    this.threadsService.isThreads$.next(false);
    localStorage.setItem('isThreads', '0');
  }

  ngOnDestroy(): void {
    this.threadSocketService.offComments();
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
    strArr.forEach((word) => {
      if (this.itemFormat(word)) {
        pic = word;
        strArr.splice(strArr.indexOf(word), 1);
      }
    });
    return { url: pic, text: strArr.join(' ') };
  }
}
