import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ActiveChatService } from '../active-chat.service';
import { IMessage } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit, AfterViewChecked {
  @ViewChild("wrapper") wrapper!:ElementRef;
  // @ViewChild("blockTrigger") blockTrigger!:MatMenuTrigger;

  editMessageID: string = '';
  isEditMessage: boolean = false;
  toggle!: boolean;

  message: FormControl = new FormControl('');
  data: IMessage[] = [];

  myUserName: string = '';
  myId: string = ''; 
  chatID: string = '625555ea8ef822301dab93c8';

  imageOrFile: string = '';
  formatImage: string = '';

  constructor(private service: DialogService, private activeService: ActiveChatService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.getMe()
    this.activeService.activeChatSubject.subscribe(
      (id)=>{
        this.chatID = id;
        this.getMessages(id);
      }
    )
  };

  ngAfterViewChecked(): void {
    // this.changeScroll();
  };

  getMe(): void {
    this.service.getMe()
    .subscribe((response) => {
        this.myId = response._id;
        this.myUserName = response.username;
      })
  };

  changeScroll(): void { // работает некорректно, при клике внутри чата, прокручивает вниз
    this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
  };

  addImage(input: any) {
    let imageOrFile = '';
    let reader = new FileReader();
    let file = input.files[0];
    reader.onloadend = () => {
      if (typeof reader.result == "string") {
        imageOrFile = reader.result;
        console.log(this.imageCompress.byteCount(reader.result))
        this.imageCompress.compressFile(imageOrFile, -1, 5, 5)
          .then(result =>  {
            this.imageOrFile = result.slice(imageOrFile.indexOf(',') + 1);
            this.formatImage = result.slice(0, imageOrFile.indexOf(',') + 1);
            console.log(this.imageCompress.byteCount(this.imageOrFile))
          });
      }
      else {
        alert("Вы отправляете не картинку!")
      }
    }
    reader.readAsDataURL(file);
  }
  
  getMessages(idChat: string):void {
    this.service.getMessages(idChat).subscribe((res) => {
      this.data = res
    })
  };

  deleteMessage(id:string):void {
    this.service.deleteMessage(id, this.chatID)
    .subscribe(() => {
        this.getMessages(this.chatID)
     })
  };
  
  deleteChat(){
    console.log('удалить чат')
  }

  editMessage(text:string, id:string):void {
    this.service.editMessage(text, id, this.chatID).subscribe(
      () => {
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

      if(this.isEditMessage){
        this.editMessage(this.message.value, this.editMessageID)
      }

      else {
        this.service.sendMessage(this.message.value, this.chatID, this.imageOrFile, this.formatImage)
        .subscribe(() => {
            this.getMessages(this.chatID)
          }
        )
      }
      this.message.setValue('');
      this.imageOrFile = '';
      this.formatImage = '';
    }
  }

  itemFormat(item: string) {
    if (item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif")) {
      return true
    }
    return false
  }
}

// toggleMenu(id:string):void{
//   if(this.myId === id){
//     this.blockTrigger.openMenu()
//   }else{
//     this.blockTrigger.closeMenu()
//   }
// }