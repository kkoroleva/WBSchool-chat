import { DialogService } from '../../dialog.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Action, select, Store } from '@ngrx/store';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, tap } from 'rxjs';
import { IGroupsState } from '../../../store/reducers/groups.reducers';
import { selectChatGroup } from '../../../store/selectors/groups.selectors';
import {
  deleteMessage,
  editMessage,
  initDialogs,
  newEditMessage,
  pushToMessages,
  removeMessage,
  sendMessage,
} from 'src/app/store/actions/dialog.action';
import { selectDialog } from 'src/app/store/selectors/dialog.selector';
import { IMessage } from '../../dialog';
import { SocketService } from 'src/app/socket/socket.service';
import { Actions, ofType } from '@ngrx/effects';

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
  message: FormControl = new FormControl('');
  userName = '';
  userID = '';
  myId = '';
  chatID = '';
  imageOrFile = '';
  formatImage = '';
  messageContent = '';
  ioConnection: any;

  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  );

  public messages$: Observable<IMessage[]> = this.store$.pipe(
    select(selectDialog),
    tap((resp) => {
      setTimeout(() => {
        this.changeScroll();
      }, 300);
    })
  );

  constructor(
    private service: DialogService,
    private imageCompress: NgxImageCompressService,
    private store$: Store<IGroupsState>,
    private socketService: SocketService, 
  ) { }

  private initIoConnection(): void {
    this.socketService.onMessage()
      .subscribe((message: IMessage) => {
        if (this.chatID === message.chatId) {
          this.store$.dispatch(pushToMessages({ message }))
        }
      });
    this.socketService.onDeleteMessage()
      .subscribe((messageId: string) => {
        this.store$.dispatch(deleteMessage({ id: messageId }))
      })
    this.socketService.onUpdateMessage()
      .subscribe((message: IMessage) => {
        this.store$.dispatch(editMessage({ message }))
      })

  }

  ngOnInit(): void {
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
    console.log(id, this.chatID);
    this.store$.dispatch(removeMessage({ id, chatId: this.chatID }));
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
        this.editMessage(this.message.value, this.editMessageID, this.chatID);
      } else if (this.imageOrFile.length > 0) {
        const message: IMessage = {
          text: this.message.value,
          imageOrFile: this.imageOrFile,
          formatImage: this.formatImage,
        };
        this.store$.dispatch(sendMessage({ message, id: this.chatID }));
      } else {
        let message: IMessage = { text: this.message.value };
        this.store$.dispatch(sendMessage({ message, id: this.chatID }));
      }
      this.imageOrFile = '';
      this.formatImage = '';
      this.message.setValue('');
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
}
