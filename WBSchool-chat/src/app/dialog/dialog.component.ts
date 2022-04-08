import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMessage } from './dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  message = new FormControl('');

  myId:number = 264; 

  messageData:IMessage[] =[

    {
    text: "Hey There !",
    owner: 263,
    date:'Today, 2:01pm'
    },
    {
    text: "How are you doing? ",
    owner: 263,
    date:'Today, 2:02pm'
    },
    {
    text: "Hello...",
    owner: 264,
    date:'Today, 2:12pm'
    },
    {
    text: "I am good  and hoew about you?",
    owner: 264,
    date:'Today, 2:12pm'
    },
    {
    text: "I am doing well. Can we meet up tomorrow?",
    owner: 263,
    date:'Today, 2:12pm'
    },
    {
    text: "Sure!",
    owner: 264,
    date:'Today, 2:14pm'
    }

]

  

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(event:KeyboardEvent) {
    if (this.message.value.trim() && event.key === 'Enter') {
      this.messageData.push({
        text: this.message.value,
        owner: this.myId,
        date: 'Today, 7:12pm',
      });

      this.message.setValue('');
    }
  }
 
}
