import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IMessage } from './dialog';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  editMessageID = ''

  isEditMessage = false

  message = new FormControl('');

  myId:string = '625426411a25022b2ae1c7b1'; 

  data!:IMessage[]
  

  constructor(private service:DialogService) { }

  ngOnInit(): void {
    this.getMessages()
    
  }
  getMessages()
  {///==============для получение сообщение 
    this.service.getMessages().subscribe((res)=>{
      this.data = res 
    })
  }



deleteMessage(id:string){
  this.service.deleteMessage(id).subscribe(
    () => {
      this.getMessages()
    }
  )
}
editMessage(text:string, id:string){
  this.service.editMessage(text, id).subscribe(
    () => {
      this.getMessages()
      this.isEditMessage = false
    }
  )
}

getMessage(id:string, text:string){///================для получение сообщение в инпуте 
  this.isEditMessage = true
  this.editMessageID = id
  this.message.setValue(text)
}



sendMessage(event:KeyboardEvent)
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

      this.message.setValue('');
    }
  }


 
}
