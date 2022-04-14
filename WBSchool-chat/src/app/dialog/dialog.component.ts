import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu/';
import { ActiveChatService } from '../active-chat.service';
import { IMessage } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewChecked {
  @ViewChild("wrapper") wrapper!: ElementRef;

  // @ViewChild("blockTrigger") blockTrigger!:MatMenuTrigger;

  editMessageID: string = '';

  isEditMessage: boolean = false;

  message: FormControl = new FormControl('');

  myId: string = '';

  data: IMessage[] = [];

  myUserName: string = '';

  chatID: string = '625555ea8ef822301dab93c8';

  constructor(private service: DialogService, private activeService: ActiveChatService) { }

  ngOnInit(): void {
    this.getMe();
    this.activeService.activeChatSubject.subscribe(
<<<<<<< HEAD
      (id) => {
        console.log(id, "idddddddddd")
=======
      (id)=>{
>>>>>>> 825acfb3304a8aa96fcbbb64a3327e98f7d52d9d
        this.chatID = id;
        this.getMessages(id);
      }
    )
  };

  ngAfterViewChecked(): void {
    this.changeScroll();
  };

  getMe(): void {
    this.service.getMe().subscribe(
      (response) => {
        this.myId = response._id
        this.myUserName = response.username
        console.log(response)
      }
    )
  };

  deleteChat() {
    console.log('удалить чат')
  };

  changeScroll(): void {
    this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
  };


  getMessages(idChat: string): void {

    this.service.getMessages(idChat).subscribe((res) => {
      this.data = res
    })
  };


  editMessage(text: string, id: string): void {
    this.service.editMessage(text, id, this.chatID).subscribe(
      () => {

        this.getMessages(this.chatID)
        this.isEditMessage = false
      }
    )
  };

  deleteMessage(id: string): void {
    this.service.deleteMessage(id, this.chatID).subscribe(
      () => {
        this.getMessages(this.chatID)
      }
    )

  };


  getMessage(id: string, text: string): void {
    this.isEditMessage = true;
    this.editMessageID = id;
    this.message.setValue(text);
  };
  counter = 0;
  sendMessage(event: KeyboardEvent): void {
    if (this.message.value.trim() && event.key === 'Enter') {

      if (this.isEditMessage) {

        this.editMessage(this.message.value, this.editMessageID)

      } else {
        this.service.sendMessage(this.message.value, this.chatID).subscribe(
          () => {
            this.counter++;
            console.log(this.counter);
            console.log(this.chatID, "thischat")

            this.getMessages(this.chatID)
          }
        )
      }
      this.message.setValue('')
    }
  }
}

// toggleMenu(id:string):void{
//   if(this.myId === id){
//     this.blockTrigger.openMenu()
//   }else{
//     this.blockTrigger.closeMenu()
//   }
// }
