import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalHelpComponent } from './modal-help/modal-help.component';

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
  constructor(public dialog: MatDialog) {}


  // pictureSrc: string = "https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png";

  pictureSrc: string = "https://avatars.mds.yandex.net/get-zen_doc/4636135/pub_601e93fd86f4e222081ccbe2_601e94715fadcc22a9dd0e1e/scale_1200";
  name: string = localStorage.getItem('username')!
  status: string = localStorage.getItem('userRights')!
  description: string = "I'm gangstar, bitch!"
  selectedItem!: btnList;
  toggle: boolean = false;
  output: boolean = false;

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
    "title": "Help",
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

  click(str: string) {
    console.log(str)
    // и тут через switch распределить по методам наши нажатия
  }


  onSelect(item: btnList): void { 
    this.selectedItem = item;
  }

  submit(event: any) {
    const formData: any = {};
    if (event.target[0].id == 1) {
      formData.username = event.target[0].value;
    }
    else if (event.target[0].id == 2) {
      formData.status = event.target[0].value;
    }
    else if (event.target[0].id == 3) {
      formData.pictureSrc = event.target[0].value;
    }
    else if (event.target[0].id == 4) {
      formData.description = event.target[0].value;
    }
    else if (event.target[0].id == 5) {
      formData.wallpaper = event.target[0].value;
    }
    // switch (event.target[0].id) {
    //   case 1:
    //     formData.username = event.target[0].value;
    //     break;
    //   case 2:
    //     formData.status = event.target[0].value;
    //     break;
    //   case 3:
    //     formData.pictureSrc = event.target[0].value;
    //     break;
    //   case 4:
    //     formData.description = event.target[0].value;
    //     break;
    //   case 5:
    //     formData.wallpaper = event.target[0].value;
    //     break;
    // }
    console.log(formData)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalHelpComponent, {
      panelClass: 'modal-help'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeOutput() {
    this.output = !this.output
  }

  // onSelect(item: btnList): void { 
  //   this.selectedItem = item;
  // }

  // submit(event: any) {
  //   const formData: any = {};
  //   if (event.target[0].id == 1) {
  //     formData.username = event.target[0].value;
  //   }
  //   else if (event.target[0].id == 2) {
  //     formData.status = event.target[0].value;
  //   }
  //   else if (event.target[0].id == 3) {
  //     formData.pictureSrc = event.target[0].value;
  //   }
  //   else if (event.target[0].id == 4) {
  //     formData.description = event.target[0].value;
  //   }
  //   else if (event.target[0].id == 5) {
  //     formData.wallpaper = event.target[0].value;
  //   }
    // switch (event.target[0].id) {
    //   case 1:
    //     formData.username = event.target[0].value;
    //     break;
    //   case 2:
    //     formData.status = event.target[0].value;
    //     break;
    //   case 3:
    //     formData.pictureSrc = event.target[0].value;
    //     break;
    //   case 4:
    //     formData.description = event.target[0].value;
    //     break;
    //   case 5:
    //     formData.wallpaper = event.target[0].value;
    //     break;
    // }
    // console.log(formData)
  // }
}
