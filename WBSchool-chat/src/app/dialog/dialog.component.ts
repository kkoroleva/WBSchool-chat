import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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

  message: FormControl = new FormControl('');
  
  image!: string;

  myId:string = '625426411a25022b2ae1c7b1'; 

  data:IMessage[] = [];

  toggle!: boolean;

  formData: any = {
    imageOrFile: ''
  }

  constructor(private service:DialogService) { }

  ngOnInit(): void {
    this.getMessages()
  };

  ngAfterViewChecked(): void {
    this.changeScroll();
  }

  addImage(input: any) {
    console.log(this.formData.imageOrFile)
    let imageOrFile: string | ArrayBuffer| null | any = '';
    let reader = new FileReader();
    let file = input.files[0];
    reader.onloadend = () => {
      imageOrFile = reader.result;
      this.formData.imageOrFile = imageOrFile.slice(imageOrFile.indexOf(',') + 1);
    }
    reader.readAsDataURL(file);
  }
  
  getMessages():void {///==============для получение сообщение 
    this.service.getMessages().subscribe((res)=> {
      // (res.includes(".png") || this.message.value.includes(".jpeg") || this.message.value.includes(".jpg") || this.message.value.includes(".svg"))
      // res.forEach(elem => {
      //   elem.imageOrFile = 'data:image/jpeg;base64,' + elem.imageOrFile
      // })
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
  this.image = btoa(this.formData.image);
};

changeScroll(){
  this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
}

sendMessage(event:KeyboardEvent):void {
    if (this.message.value.trim() && event.key === 'Enter' || this.formData.image) {



      if(this.isEditMessage){
        this.editMessage(this.message.value, this.editMessageID)
      }
      // else if (this.message.value.includes(".png") || this.message.value.includes(".jpeg") || this.message.value.includes(".jpg") || this.message.value.includes(".svg")){
      //   this.service.sendMessage(btoa(this.message.value), this.formData.imageOrFile).subscribe(
      //     () => {
      //       this.getMessages()
      //     }
      //   )
      // }
      else {
        this.service.sendMessage(this.message.value, this.formData.imageOrFile).subscribe(
          () => {
            this.getMessages()
          }
        )
      }
      this.message.setValue('')
    }
  }

  itemFormat(item: string) {
    if (item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg")) {
      return true
    }
    return false
  }
}
