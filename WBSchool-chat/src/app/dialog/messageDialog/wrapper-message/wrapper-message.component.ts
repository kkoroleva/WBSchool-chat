import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMessage } from '../../dialog';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-wrapper-message',
  templateUrl: './wrapper-message.component.html',
  styleUrls: ['./wrapper-message.component.scss']
})
export class WrapperMessageComponent implements OnInit {

  @ViewChild("wrapper") wrapper!:ElementRef;
  
  editMessageID: string = '';
  isEditMessage: boolean = false;
  toggle!: boolean;
  message: FormControl = new FormControl('');
  chatID: string = '625555ea8ef822301dab93c8';
  data: IMessage[] = [];


  myUserName: string = '';
  myId: string = ''; 
  imageOrFile: string = '';
  formatImage: string = '';


  constructor(private service: DialogService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.changeScroll();
  };

  changeScroll(): void {
    this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
  };

  deleteMessage(id: string): void {
    this.service.deleteMessage(id, this.chatID).subscribe(() => {
        this.getMessages(this.chatID)
     })
  };

  getMessage(id: string, text: string): void {
    this.isEditMessage = true;
    this.editMessageID = id;
    this.message.setValue(text);
  };


  itemFormat(item: string) {
    if (item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif")) {
      return true
    }
    return false
  }

  getMessages(idChat: string):void {
    this.service.getMessages(idChat).subscribe((res) => {
      this.data = res
    })
  };
}
