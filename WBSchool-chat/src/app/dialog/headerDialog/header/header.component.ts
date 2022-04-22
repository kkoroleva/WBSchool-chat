import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name:any = "";
  imgAva = "../../assets/ava.svg"
  constructor(private service: DialogService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo():void{
    this.service.getMyInfo().subscribe(
      (info)=>{
        this.imgAva = info.avatar
        console.log("hello world", info)
      }
    )
  }

  deleteChat() {
    console.log('удалить чат')
  }
}
