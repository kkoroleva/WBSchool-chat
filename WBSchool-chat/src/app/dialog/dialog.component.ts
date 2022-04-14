import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu/';
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

  editMessageID:string = '';

  isEditMessage:boolean = false;

  message:FormControl = new FormControl('');

  myId:string = ''; 

  data:IMessage[] = [];

  myUserName:string = '';
  
  constructor(private service:DialogService) { }
  
  ngOnInit(): void {
    this.getMessages();
    this.getMe();
  };

  ngAfterViewChecked(): void {
    this.changeScroll();
  };
 
  getMe():void{
    this.service.getMe().subscribe(
      (response)=>{
        this.myId = response._id
        this.myUserName = response.username
      }
    )
  };
  
  deleteChat(){
    console.log('удалить чат')
  };
  
  changeScroll():void{
    this.wrapper.nativeElement.scrollTop = this.wrapper.nativeElement.scrollHeight;
  };
  
  
  getMessages():void {
    this.service.getMessages().subscribe((res)=>{
      this.data = res 
    })
  };
  

editMessage(text:string, id:string):void {
    this.service.editMessage(text, id).subscribe(
      () => {
        this.getMessages()
        this.isEditMessage = false
      }
      )
};
    
deleteMessage(id:string):void {
      this.service.deleteMessage(id).subscribe(
        () => {
          this.getMessages()
        }
        )
};
      
      
getMessage(id:string, text:string):void {
        this.isEditMessage = true;
        this.editMessageID = id;
        this.message.setValue(text);
};

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

// toggleMenu(id:string):void{
//   if(this.myId === id){
//     this.blockTrigger.openMenu()
//   }else{
//     this.blockTrigger.closeMenu()
//   }
// }