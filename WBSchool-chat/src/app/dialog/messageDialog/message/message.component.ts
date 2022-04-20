import { DialogService } from '../../dialog.service';
import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable, tap } from 'rxjs';
import { IGroupsState } from '../../../store/reducers/groups.reducers';
import { selectChatGroup } from '../../../store/selectors/groups.selectors';
import { IMessage } from '../../dialog';
import { deleteMessage, editMessage, initDialogs, sendMessage } from 'src/app/store/actions/dialog.action';
import { selectDialog } from 'src/app/store/selectors/dialog.selector';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  @ViewChild("wrapper") wrapper!:ElementRef;

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
    select(selectDialog), 
    tap(() =>{
      console.log("console info")
      setTimeout(() => {
        this.changeScroll()
      }, 5000);
    })

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
    // this.changeScroll();
  };

  changeScroll(): void {
      console.log("scroll", this.wrapper.nativeElement.scrollTop , this.wrapper.nativeElement.scrollHeight);
      this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight 
  };

  getMyInfo(): void {
    this.service.getMyInfo()
    .subscribe((response) => {
        this.myId = response._id;
        this.userName = response.username;
      })
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
        // this.getMessages(this.chatID)
        // this.store$.dispatch(deleteMessage({id:this.chaID}))

     })
  };

  deleteChat() {
    console.log('удалить чат')
  }

  editMessage(text: string, id: string, idChat: string):void {
    this.isEditMessage = false;
    this.store$.dispatch(editMessage({text, id, idChat}))
  }

  getMessage(id: string, text: string): void {
    this.isEditMessage = true;
    this.editMessageID = id;
    this.message.setValue(text);
  };

  sendMessage(event: KeyboardEvent): void {
    if (this.message.value.trim() && event.key === 'Enter' 
    || 
    this.message.value.trim()
    && event.key === 'Enter' 
    && this.imageOrFile.length > 0 ) {
      if(this.isEditMessage) {
        console.log("abc")
        this.editMessage(this.message.value, this.editMessageID, this.chatID)
      }
      else {
            let message:IMessage = {
              text: this.message.value,
              imageOrFile: this.imageOrFile,
              formatImage: this.formatImage,
            }
            this.store$.dispatch(sendMessage({message, id:this.chatID}))
            this.imageOrFile = '';
            this.formatImage = '';
            this.message.setValue('');
          }
      }
    }
    itemFormat(item: string) {
      return !! (item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif")) 
    }
  }


