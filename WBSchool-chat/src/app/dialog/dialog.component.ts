import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
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

  @ViewChild("blockTrigger") blockTrigger!:MatMenuTrigger;

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

  constructor(private service: DialogService, private activeService: ActiveChatService) { }

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
    this.changeScroll();
  };

  getMe(): void {
    this.service.getMe()
    .subscribe((response) => {
        this.myId = response._id;
        this.myUserName = response.username;
      })
  };

  addImage(input: any) {
    let imageOrFile = '';
    let reader = new FileReader();
    let file = input.files[0];
    reader.onloadend = () => {
      if (typeof reader.result == "string") {
        imageOrFile = reader.result;
        this.formatImage = imageOrFile.slice(0, imageOrFile.indexOf(',') + 1);
        this.imageOrFile = imageOrFile.slice(imageOrFile.indexOf(',') + 1);
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
  };
  
  changeScroll():void{
    this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
  };
  
  editMessage(text:string, id:string):void {
    this.service.editMessage(text, id, this.chatID).subscribe(
      () => {
        this.getMessages(this.chatID);
        this.isEditMessage = false;
      })
  }

      
toggleMenu(id:string):void{
  console.log(id, "this my id")
  if(this.myId !== id){
    this.blockTrigger.closeMenu()
  }else{
    this.blockTrigger.openMenu()
  }
};
      

  getMessage(id: string, text: string): void {
    this.isEditMessage = true;
    this.editMessageID = id;
    this.message.setValue(text);
  };

  sendMessage(event: KeyboardEvent): void {
    if (this.message.value.trim() && event.key === 'Enter' 
      || 
      this.message.value.trim() && event.key === 'Enter' && this.imageOrFile.length > 0 && this.formatImage.length > 0 && event.key === 'Enter') {

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

// function editMessage(text: any, string: any, id: any, string: any) {
//   throw new Error('Function not implemented.');
// }


