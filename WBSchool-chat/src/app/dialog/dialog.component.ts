import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMessage } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewChecked {
  @ViewChild("wrapper") wrapper!:ElementRef

  editMessageID:string = '';

  isEditMessage:boolean = false;

  message:FormControl = new FormControl('');

  myId:string = '625426411a25022b2ae1c7b1'; 

  data:IMessage[] = [];
  
  
  constructor(private service:DialogService) { }

  
  ngOnInit(): void {
    this.getMessages();
  };
  ngAfterViewChecked(): void {
    this.changeScroll();
  }
 
  
  getMessages():void {
    this.service.getMessages().subscribe((res)=>{
      this.data = res 
    })
  };

deleteMessage(id:string):void {
  this.service.deleteMessage(id).subscribe(
    () => {
      this.getMessages()
    }
  )
};
deleteChat(){
  console.log('удалить чат')
}

editMessage(text:string, id:string):void {
  this.service.editMessage(text, id).subscribe(
    () => {
      this.getMessages()
      this.isEditMessage = false
    }
  )
};

getMessage(id:string, text:string):void {
  this.isEditMessage = true;
  this.editMessageID = id;
  this.message.setValue(text);
};

changeScroll(){
  this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
}

sendMessage(event:KeyboardEvent):void {
    if (this.message.value.trim() && event.key === 'Enter') {



      if(this.isEditMessage){

        this.editMessage(this.message.value, this.editMessageID)

      }else{
        this.service.sendMessage(this.message.value).subscribe(
          () => {
            this.getMessages()
          }
        )
      }
      this.message.setValue('')
    }
  }
}
