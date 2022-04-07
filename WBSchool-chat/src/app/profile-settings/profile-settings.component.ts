import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  constructor() { }

  pictureSrc: string = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png";
  name: string = "Name Name"
  status: string = "status status"

  blankClick() {
    console.log('click')
  }

  ngOnInit(): void {
  }

}
