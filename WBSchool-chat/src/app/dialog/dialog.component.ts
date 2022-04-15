import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  toggle!: boolean;

  message: FormControl = new FormControl('');
  data: IMessage[] = [];
  myId: string = '625426411a25022b2ae1c7b1'; 

  imageOrFile: string = '';
  formatImage: string = '';

  constructor(private service: DialogService) { }

  ngOnInit(): void {
    this.getMessages()
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
  
  getMessages():void {
    this.service.getMessages().subscribe((res)=> {
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
      this.getMessages();
      this.isEditMessage = false;
    }
  )
};

getMessage(id: string, text: string): void {
  this.isEditMessage = true;
  this.editMessageID = id;
  this.message.setValue(text);
};

sendMessage(event:KeyboardEvent): void {
    if (this.message.value.trim() && event.key === 'Enter' 
      || 
      this.message.value.trim() && event.key === 'Enter' && this.imageOrFile.length > 0 && this.formatImage.length > 0 && event.key === 'Enter') {

      if(this.isEditMessage){
        this.editMessage(this.message.value, this.editMessageID)
      }
      else {
        this.service.sendMessage(this.message.value, this.imageOrFile, this.formatImage)
        .subscribe(() => {
            this.getMessages()
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
