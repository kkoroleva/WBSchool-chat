import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ProfileSettingsService } from './service/profile-settings.service';

interface btnList {
  "id": number,
  "icon": string,
  "title": string,
  "description": string
}

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  // pictureSrc: string = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png";
  pictureSrc: string = "https://avatars.mds.yandex.net/get-zen_doc/4636135/pub_601e93fd86f4e222081ccbe2_601e94715fadcc22a9dd0e1e/scale_1200";
  name: string = localStorage.getItem('username')!
  status: string = localStorage.getItem('userRights')!
  description: string = "I'm gangstar, bitch!"
  selectedItem!: btnList;
  toggle: boolean = false;
  output: boolean = false; // если false, показвает настройки пользователя, если true, показывает информацию о нём
  formData: any = {}
  wallpaper: string = "some text";
  // VVV Dummy data VVV
  settingsList: btnList[] = [
    {
      "id": 1,
      "icon": "edit",
      "title": "Edit Profile Name",
      "description": this.name
    },
    {
      "id": 2,
      "icon": "textsms",
      "title": "Edit Profile Status Info",
      "description": this.status
    },
    {
      "id": 3,
      "icon": "add_photo_alternate",
      "title": "Edit Profile Photo",
      "description": this.pictureSrc
    },
    {
      "id": 4,
      "icon": "edit",
      "title": "Edit Description",
      "description": this.description
    },
    {
      "id": 5,
      "icon": "wallpaper",
      "title": "Change wallpaper",
      "description": "some text"
    }
  ]

  help: btnList = {
    "id": 1,
    "icon": "help_outline",
    "title": "help",
    "description": "some text"
  }

  
  profileInfoList: btnList[] = [
    {
      "id": 1,
      "icon": "person",
      "title": "Username: " + "User User",
      "description": "some text"
    },
    {
      "id": 2,
      "icon": "phone",
      "title": "Phone: " + " 8(999)123-45-67",
      "description": "some text"
    },
    {
      "id": 3,
      "icon": "people",
      "title": "Friend status: " + "Added/Not added",
      "description": "some text"
    },
    {
      "id": 4,
      "icon": "email",
      "title": "Messages sent: " + "6348",
      "description": "some text"
    },
    {
      "id": 5,
      "icon": "delete",
      "title": "Delete contact",
      "description": "some text"
    },
    {
      "id": 6,
      "icon": "block",
      "title": "Block user",
      "description": "some text"
    }
  ]

  constructor(private profileServ: ProfileSettingsService) {}

  click(str: string) {
    console.log(str)
    // и тут через switch распределить по методам наши нажатия
  }

  changeOutput() {
    this.output = !this.output
  }

  onSelect(item: btnList): void { 
    this.selectedItem = item;
  }

  addToFormData(inputData: any) {
    if (inputData.id == 1) {
      this.formData.username = inputData.value;
    }
    else if (inputData.id == 2) {
      this.formData.status = inputData.value;
    }
    else if (inputData.id == 3) {
      this.formData.pictureSrc = inputData.value;
    }
    else if (inputData.id == 4) {
      this.formData.description = inputData.value;
    }
    else if (inputData.id == 5) {
      this.formData.wallpaper = inputData.value;
    }
  }

  submit() {
    this.profileServ.editProfileSettings(this.formData)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((response: any) => {
      this.name = response.username;
      this.status = response.status;
      this.pictureSrc = response.pictureSrc;
      this.description = response.description;
      this.wallpaper = response.wallpaper;
    })
  }
}
