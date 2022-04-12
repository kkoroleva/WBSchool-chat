import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ProfileSettingsService } from './service/profile-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalHelpComponent } from './modal-help/modal-help.component';
import { IProfileData, IServerResponse, ISettingsList } from './interfaces/interface';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit{
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

  settingsList: ISettingsList[];

  constructor(private profileServ: ProfileSettingsService, public dialog: MatDialog) {
    this.settingsList = [
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
        "description": this.profileData.status
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
        "description": "some text"
      }
    ]
  }

  ngOnInit(): void {
    this.getUsersData();
    console.log(this.profileData)
  }

  getUsersData(): IProfileData {
    this.profileServ.getUsersData()
    .subscribe((response: IServerResponse) => {
      this.profileData = Object.assign({}, {
        username: response.username,
        about: response.about,
        avatar: atob(response.avatar),
        email: response.email
      })
      console.log(response)
    })
    return this.profileData;
  }

  onSelect(item: ISettingsList): void { 
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
      this.formData.avatar = btoa(inputData.value);
    }
    else if (inputData.id == 4) {
      this.formData.about = inputData.value;
    }
    else if (inputData.id == 5) {
      this.formData.wallpaper = inputData.value;
    }
  }

  submit(): IProfileData {
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
    })
    this.formData = {};
    return this.profileData;
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
