import { Component, OnInit } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ProfileSettingsService } from './service/profile-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalHelpComponent } from './modal-help/modal-help.component';
import { IProfileData, IServerResponse, ISettingsList } from './interfaces/interface';
import { ProfilePageService } from '../profile-page/service/profile-page.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { INewUser, IUserData } from '../auth/interfaces';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../store/selectors/auth.selectors';

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
    public settServ: ProfilePageService,
    private storage: StorageMap,
    private store$: Store
  ) {}

  ngOnInit(): void {
      this.getUsersData();
  }

  getUsersData() {
    this.store$.pipe(select(selectUser))
    .subscribe((newUser: IUserData) => {
      this.profileData = Object.assign({}, {
        username: newUser.username,
        about: newUser.about,
        avatar: atob(newUser.avatar),
        email: newUser.email
      })
    })
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

  submit() {
    this.profileServ.editProfileSettings(this.formData)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((newUser: any) => {
      this.storage.set('user', newUser)
      .subscribe(() => {});
    })
    this.formData = {};
    location.reload();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalHelpComponent, {
      panelClass: 'modal-help'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  lengthForm() {
    return Object.keys(this.formData).length > 0 ? true : false;
  }
}
