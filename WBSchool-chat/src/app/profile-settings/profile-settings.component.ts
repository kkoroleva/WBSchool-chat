import { Component, OnInit } from '@angular/core';

interface btnList {
  "icon": string,
  "title": string
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  pictureSrc: string = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png";
  name: string = "Name Name"
  status: string = "status status"
  output: boolean = false; // если false, показвает настройки пользователя, если true, показывает информацию о нём
  // VVV Dummy data VVV
  settingsList: btnList[] = [
    {
      "icon": "account_circle",
      "title": "Profile"
    },
    {
      "icon": "edit",
      "title": "Edit Profile Name"
    },
    {
      "icon": "textsms",
      "title": "Edit Profile Status Info"
    },
    {
      "icon": "add_photo_alternate",
      "title": "Edit Profile Photo"
    },
    {
      "icon": "help_outline",
      "title": "help"
    },
    {
      "icon": "wallpaper",
      "title": "Change wallpaper"
    },
    {
      "icon": "share",
      "title": "Invite"
    },
  ]
  profileInfoList: btnList[] = [
    {
      "icon": "person",
      "title": "Username: " + "User User"
    },
    {
      "icon": "phone",
      "title": "Phone: " + " 8(999)123-45-67"
    },
    {
      "icon": "people",
      "title": "Friend status: " + "Added/Not added"
    },
    {
      "icon": "email",
      "title": "Messages sent: " + "6348"
    },
    {
      "icon": "delete",
      "title": "Delete contact"
    },
    {
      "icon": "block",
      "title": "Block user"
    }
  ]

  click(str: string) {
    console.log(str)
    // и тут через switch распределить по методам наши нажатия
  }

  changeOutput() {
    this.output = !this.output
  }
}
