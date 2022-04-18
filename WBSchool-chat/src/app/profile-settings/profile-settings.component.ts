import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ProfileSettingsService } from './service/profile-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalHelpComponent } from './modal-help/modal-help.component';
import { IProfileData, IServerResponse, ISettingsList } from './interfaces/interface';
import { ProfilePageService } from '../profile-page/service/profile-page.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  profileData: IProfileData = {
    username: '',
    status: 'Не беспокоить',
    avatar: '',
    email: '',
    about: '',
    wallpaper: 'some text'
  };
  formData: IProfileData = {};
  selectedItem!: ISettingsList;
  toggle: boolean = false;
  errorMsg: string | boolean = false;

  settingsList: ISettingsList[] = [
    {
      "id": 1,
      "icon": "edit",
      "title": "Edit Profile Name",
      "description": this.profileData.username
    },
    {
      "id": 2,
      "icon": "textsms",
      "title": "Edit Profile Status Info",
      "description": 'null' // this.profileData.status
    },
    {
      "id": 3,
      "icon": "add_photo_alternate",
      "title": "Edit Profile Photo",
      "description": this.profileData.avatar
    },
    {
      "id": 4,
      "icon": "edit",
      "title": "Edit Description",
      "description": this.profileData.about
    },
    {
      "id": 5,
      "icon": "edit",
      "title": "Edit Email",
      "description": this.profileData.email
    },
    {
      "id": 6,
      "icon": "wallpaper",
      "title": "Change wallpaper",
      "description": "null"
    }
  ]

  constructor(
    private profileServ: ProfileSettingsService, 
    public dialog: MatDialog,
    public settServ: ProfilePageService
  ) {}

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.profileServ.getUsersData()
    .subscribe((response: IServerResponse) => {
      this.profileData = Object.assign({}, {
        username: response.username,
        about: response.about,
        avatar: atob(response.avatar),
        email: response.email
      })
      this.settingsList[0].description = response.username;
      this.settingsList[3].description = response.about;
      // this.settingsList[4].description = response.email;
    })
  }

  onSelect(item: ISettingsList): void { 
    this.selectedItem = item;
  }

  addToFormData(inputData: any) {
    if (inputData.id == 1) {

      if (inputData.value.match(/^[a-zA-Z0-9а-яёА-ЯЁ]*[-_— .]?[a-zA-Z0-9а-яёА-ЯЁ]*$/) &&
          inputData.value.length >= 4 && 
          inputData.value.length <= 100) {
        this.formData.username = inputData.value;
        this.errorMsg = false
      }
      else this.errorMsg = 'Username error'

    } else if (inputData.id == 4) {

      if (inputData.value.length >= 4 && inputData.value.length <= 100) {
        this.formData.about = inputData.value;
        this.errorMsg = false
      } else this.errorMsg = 'Description error'

    } else if (inputData.id == 5) {

      if (inputData.value.length >= 4 && inputData.value.length <= 100 && 
          inputData.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.formData.about = inputData.value;
        this.errorMsg = false
      } else this.errorMsg = 'Email error'
      
    }
  }

  submit() {
    this.profileServ.editProfileSettings(this.formData)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((response: IServerResponse) => {
      this.profileData.username = response.username;
      // this.status = response.status;
      this.profileData.avatar = atob(response.avatar);
      this.profileData.about = response.about;
      this.profileData.email = response.email;
      // this.wallpaper = response.wallpaper;
      console.log(response)
    })
    this.getUsersData()
    this.formData = {};
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalHelpComponent, {
      panelClass: 'modal-help'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
