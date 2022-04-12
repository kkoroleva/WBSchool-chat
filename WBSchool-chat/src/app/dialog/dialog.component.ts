import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMessage } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  editMessageID:string = '';

  isEditMessage:boolean = false;

  message:FormControl = new FormControl('');

  myId:string = '625426411a25022b2ae1c7b1'; 

  data:IMessage[] = [];
  

  constructor(private service:DialogService) { }

  ngOnInit(): void {
    this.getMessages()
  };
  
  getMessages():void
  {///==============для получение сообщение 
    this.service.getMessages().subscribe((res)=>{
      this.data = res 
    })
  };



deleteMessage(id:string):void
{
  this.service.deleteMessage(id).subscribe(
    () => {
      this.getMessages()
    }
  )
};


editMessage(text:string, id:string):void
{
  this.service.editMessage(text, id).subscribe(
    () => {
      this.getMessages()
      this.isEditMessage = false
    }
  )
};


getMessage(id:string, text:string):void
{///================для получение сообщение в инпуте привязен к кнопке изменить 
  this.isEditMessage = true;
  this.editMessageID = id;
  this.message.setValue(text);
};



sendMessage(event:KeyboardEvent):void
  {
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
