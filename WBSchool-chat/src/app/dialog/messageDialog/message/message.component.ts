import { DialogService } from '../../dialog.service';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import { IGroupsState } from '../../../store/reducers/groups.reducers';
import { selectChatGroup } from '../../../store/selectors/groups.selectors';
import { IMessage } from '../../dialog';
import { initDialogs, sendMessage } from 'src/app/store/actions/dialog.action';
import { selectDialog } from 'src/app/store/selectors/dialog.selector';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  @ViewChild("wrapper") wrapper!:ElementRef;
  // @ViewChild("blockTrigger") blockTrigger!:MatMenuTrigger;

  editMessageID: string = '';
  isEditMessage: boolean = false;
  toggle!: boolean;

  message: FormControl = new FormControl('');
  data: IMessage[] = [];

  userName: string = '';
  userID: string = '';
  myId: string = ''; 
  chatID: string = '625555ea8ef822301dab93c8';


  imageOrFile: string = '';
  formatImage: string = '';

  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup),
  )
  public messages$: Observable<IMessage[]> = this.store$.pipe(
    select(selectDialog)
  )

  constructor(private service: DialogService, 
    private imageCompress: NgxImageCompressService,
    private store$: Store<IGroupsState>) { }

  ngOnInit(): void {
    this.getMyInfo()
    this.chatGroup$.subscribe((id)=> { 
        this.chatID = id;
        this.store$.dispatch(initDialogs({id}))
        // this.getMessages(id);
      })
  };

  ngAfterViewChecked(): void {
    this.changeScroll();
  };

  getMyInfo(): void {
    this.service.getMyInfo()
    .subscribe((response) => {
        this.myId = response._id;
        this.userName = response.username;
      })
  };
    
  changeScroll(): void {
      this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
  };
    
  addImage(input: any) {
      let imageOrFile = '';
      let reader = new FileReader();
      let file = input.files[0];
        reader.onloadend = () => {
          if (typeof reader.result == "string") {
            imageOrFile = reader.result;
            if (+this.imageCompress.byteCount(reader.result) > 1048576) {
              this.imageCompress.compressFile(imageOrFile, -1, 50, 50, 800, 600)
              .then(result =>  {
                this.imageOrFile = result.slice(imageOrFile.indexOf(',') + 1);
                this.formatImage = result.slice(0, imageOrFile.indexOf(',') + 1);
                // console.log(this.imageCompress.byteCount(this.imageOrFile))
              });
            }
            else {
              this.imageOrFile = imageOrFile.slice(imageOrFile.indexOf(',') + 1);
              this.formatImage = imageOrFile.slice(0, imageOrFile.indexOf(',') + 1);
            }
          }
          else {
            alert("Вы отправляете не картинку!")
          }
        }
    reader.readAsDataURL(file);
  }
  
  getMessages(idChat: string):void {
    this.service.getMessages(idChat).subscribe((res) => {
      this.data = res;
      console.log(this.data, "this data")
    })
  };

  deleteMessage(id: string): void {
    this.service.deleteMessage(id, this.chatID).subscribe(() => {
        this.getMessages(this.chatID)
     })
  };

  deleteChat() {
    console.log('удалить чат')
  }

  editMessage(text: string, id: string):void {
    this.service.editMessage(text, id, this.chatID).subscribe(() => {
        this.getMessages(this.chatID);
        this.isEditMessage = false;
      })
  }

  getMessage(id: string, text: string): void {
    this.isEditMessage = true;
    this.editMessageID = id;
    this.message.setValue(text);
  };

  sendMessage(event: KeyboardEvent): void {
    if (this.message.value.trim() && event.key === 'Enter' 
    || 
    this.message.value.trim() && event.key === 'Enter' && this.imageOrFile.length > 0 && event.key === 'Enter') {
      
      if(this.isEditMessage) {
        console.log("i am working")
        this.editMessage(this.message.value, this.editMessageID)
      }
      else {
            let message:IMessage = {
              text: this.message.value,
              // imageOrFile: this.imageOrFile,
              // formatImage: this.formatImage,
            }
            this.store$.dispatch(sendMessage({message, id:this.chatID}))
            this.message.setValue('');
            this.imageOrFile = '';
            this.formatImage = '';
          }
      }
    }
    itemFormat(item: string) {
      return !! (item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif")) 
    }
  }


