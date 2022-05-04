import {
  allGroupsMessages,
  deleteLastGroupMessage,
  getAllGroupsMessages,
} from './../../../store/actions/groups.actions';
import { DialogService } from '../../dialog.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, tap } from 'rxjs';
import {
  IGroupsMessages,
  IGroupsState,
} from '../../../store/reducers/groups.reducers';
import {
  selectChatGroup,
  selectLastGroupsMessages,
} from '../../../store/selectors/groups.selectors';
import { Validators } from '@angular/forms';
import {
  allChatsMessages,
  deleteMessage,
  editMessage,
  getAllChatsMessages,
  initDialogs,
  newEditMessage,
  pushToMessages,
} from '../../../store/actions/dialog.action';
import { selectDialog } from '../../../store/selectors/dialog.selector';
import { IMessage } from '../../dialog';
import { IUserData } from '../../../auth/interfaces';
import { ModalProfileService } from '../../../modal-profile/service/modal-profile.service';
import { Actions, ofType } from '@ngrx/effects';
import {
  IDeleteMessage,
  MessageSocketService,
} from '../../../socket/message-socket.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { ThreadsService } from 'src/app/threads/threads.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @ViewChild('wrapper') wrapper!: ElementRef;

  editMessageID = '';
  isEditMessage = false;
  toggle!: boolean;
  message: FormControl = new FormControl('', [Validators.maxLength(1000)]);
  userName = '';
  userID = '';
  myId = '';
  chatID = '';
  imageOrFile = '';
  formatImage = '';
  messageContent = '';
  ioConnection: any;
  contacts: IUserData[] = [];
  userData: IUserData | undefined;
  imgInput = false;

  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  );

  public lastGroupsMessages$: Observable<IGroupsMessages[]> = this.store$.pipe(
    select(selectLastGroupsMessages)
  );

  private lastGroupsMessages: IGroupsMessages[] = [];

  public messages$: Observable<IMessage[]> = this.store$.pipe(
    select(selectDialog),
    tap(() => {
      setTimeout(() => {
        this.changeScroll();
      }, 300);
    })
  );
  socketService: any;

  constructor(
    private service: DialogService,
    private imageCompress: NgxImageCompressService,
    private store$: Store<IGroupsState>,
    private messageSocketService: MessageSocketService,
    private modalServ: ModalProfileService,
    private actions$: Actions,

    private threadsService: ThreadsService
  ) {}

  private initIoConnection(): void {
    this.messageSocketService.onMessage().subscribe((message: IMessage) => {
      this.store$.dispatch(pushToMessages({ message }));
      this.store$.dispatch(
        allGroupsMessages({
          chatId: message.chatId!,
          lastMessage: message.text,
          messageId: message._id!,
        })
      );
      this.store$.dispatch(
        allChatsMessages({ chatId: message.chatId!, lastMessage: message.text })
      );
    });

    this.messageSocketService
      .onDeleteMessage()
      .subscribe((message: IDeleteMessage) => {
        this.store$.dispatch(deleteMessage({ id: message.messageId }));
        this.store$.dispatch(getAllChatsMessages({ chatId: message.chatId }));
      });
    this.actions$
      .pipe(
        ofType(deleteMessage),
        tap(() =>
          this.lastGroupsMessages$.subscribe(
            (messages) => (this.lastGroupsMessages = messages)
          )
        )
      )
      .subscribe(({ id }) => {
        this.lastGroupsMessages.forEach((message) => {
          if (message.messageId === id) {
            this.store$.dispatch(
              getAllGroupsMessages({ chatId: message.chatId })
            );
          }
        })
        this.store$.dispatch(deleteLastGroupMessage({ id }));
      });
    this.messageSocketService
      .onUpdateMessage()
      .subscribe((message: IMessage) => {
        this.store$.dispatch(editMessage({ message }));
        this.store$.dispatch(
          allGroupsMessages({
            chatId: message.chatId!,
            lastMessage: message.text,
            messageId: message._id!,
          })
        );
        this.store$.dispatch(getAllChatsMessages({ chatId: message.chatId! }));
      });
  }

  ngOnInit(): void {
    this.messageSocketService.offMessages();
    this.getMyInfo();
    this.chatGroup$.subscribe((id) => {
      this.chatID = id;
      this.store$.dispatch(initDialogs({ id }));
    });
    this.initIoConnection();
  }

  changeScroll(): void {
    if (this.wrapper) {
      this.wrapper.nativeElement.scrollTop =
        this.wrapper.nativeElement.scrollHeight;
    }
  }

  getMyInfo(): void {
    this.service.getMyInfo().subscribe((response) => {
      this.myId = response._id;
      this.userName = response.username;
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

  deleteMessage(id: string): void {
    this.messageSocketService.deleteMessage(this.chatID, id);
  }

  editMessage(text: string, id: string, chatId: string): void {
    this.isEditMessage = false;
    this.store$.dispatch(newEditMessage({ text, id, chatId }));
  }

  getMessage(id: string, text: string): void {
    this.isEditMessage = true;
    this.editMessageID = id;
    this.message.setValue(text);
  }



  sendMessage(): void {
    if (
      this.message.value.trim() ||
      (this.message.value.trim() && this.imageOrFile.length > 0)
    ) {
      this.changeScroll();
      if (this.isEditMessage) {
        this.socketService.updateMessage(this.chatID, {
          text: this.message.value.trim(),
          _id: this.editMessageID,
        });
        this.isEditMessage = false;
      } else if (this.imageOrFile.length > 0) {
        const message: IMessage = {
          text: this.message.value.trim(),
          imageOrFile: this.imageOrFile,
          formatImage: this.formatImage,
        };
        this.messageSocketService.send(this.chatID, message);
      } else {
        let message: IMessage = { text: this.message.value };
        this.messageSocketService.send(this.chatID, message);
      }
      this.imageOrFile = '';
      this.formatImage = '';
      this.message.setValue('');
      this.imgInput = false;
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
    return {url: pic, text: strArr.join(' ') };
  }
/*
  sliceLinkImage(item: string) {
    let empty = item.slice(0, item.indexOf(' '));
    if (item.includes('.png')) {
      if (item.includes('album')) {
        return empty;
      } else return item.slice(0, item.indexOf('.png') + 4);
    } else if (item.includes('.jpg')) {
      if (item.includes('album')) {
        return empty;
      } else return item.slice(0, item.indexOf('.jpg') + 4);
    } else if (item.includes('.jpeg')) {
      if (item.includes('album')) {
        return empty;
      } else return item.slice(0, item.indexOf('.jpeg') + 5);
    } else if (item.includes('.svg')) {
      if (item.includes('album')) {
        return empty;
      } else return item.slice(0, item.indexOf('.svg') + 4);
    } else if (item.includes('.gif')) {
      if (item.includes('album')) {
        return empty
      }
      else return item.slice(0, item.indexOf(".gif") + 4)
    } else return
  } */
  openProfile(user: string | undefined) {
    if (user) this.modalServ.searchAndOpenDialog(user);
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

  openThread(message: IMessage) {
    this.threadsService.createThread(message);
  }

}
