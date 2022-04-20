import { Component, OnInit } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ProfileSettingsService } from '../../services/profile-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalHelpComponent } from './modal-help/modal-help.component';
import { IProfileData, IServerResponse, ISettingsList } from '../../interfaces/profile-settings';
import { ProfilePageService } from '../../services/profile-page.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { INewUser, IUserData } from '../../../auth/interfaces';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { NgxImageCompressService } from 'ngx-image-compress';
import { IContacts } from 'src/app/store/reducers/contacts.reducers';
import { selectContacts } from 'src/app/store/selectors/contacts.selectors';
// import { IContacts } from '../../store/reducers/contacts.reducers';

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


  imageOrFile: string = '';
  formatImage: string = '';

  imgInput: boolean = false;

  contacts: IUserData[] = [];
  lookContacts: boolean = false;

  settingsList: ISettingsList[] = [
    {
      "id": 1,
      "icon": "person",
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
      "icon": "mail",
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
    private imageCompress: NgxImageCompressService,
    private store$: Store
  ) {}

  ngOnInit(): void {
      this.getUsersData();
      this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
        // contacts.contacts.forEach((item: IUserData) => {
        //   item.avatar = atob(item.avatar)
        //   this.contacts = contacts.contacts
        // })
        this.contacts = contacts.contacts
        // this.contacts.map(contact => {
        //   if (contact.avatar) contact.avatar = atob(contact.avatar)
        // })
      })
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
      this.settingsList[0].description = newUser.username;
      this.settingsList[3].description = newUser.about;
      this.settingsList[4].description = newUser.email;
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

    } else if (inputData.id == 3) {

      this.formData.avatar = btoa(inputData.value)

    } else if (inputData.id == 4) {

      if (inputData.value.length >= 4 && inputData.value.length <= 100) {
        this.formData.about = inputData.value;
        this.errorMsg = false
      } else this.errorMsg = 'Description error'

    } else if (inputData.id == 5) {

      if (inputData.value.length >= 4 && inputData.value.length <= 100 && 
          inputData.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.formData.email = inputData.value;
        this.errorMsg = false
      } else this.errorMsg = 'Email error'
    }
  }

  addImage(input: any) {
    let imageOrFile = '';
    let reader = new FileReader();
    let file = input.files[0];
    reader.onloadend = () => {
      if (typeof reader.result == "string") {
        imageOrFile = reader.result;
        if (+this.imageCompress.byteCount(reader.result) > 1048576) {
          this.imageCompress.compressFile(imageOrFile, -1, 50, 50, 800, 600)
          .then(result =>  {
            this.imageOrFile = result.slice(imageOrFile.indexOf(',') + 1);
            this.formatImage = result.slice(0, imageOrFile.indexOf(',') + 1);
            this.formData.avatar = btoa(this.formatImage + this.imageOrFile)
          });
        } else {
          this.imageOrFile = imageOrFile.slice(imageOrFile.indexOf(',') + 1);
          this.formatImage = imageOrFile.slice(0, imageOrFile.indexOf(',') + 1);
          this.formData.avatar = btoa(this.formatImage + this.imageOrFile)
        }
      }
      else {
        alert("Вы отправляете не картинку!")
      }
    }
    reader.readAsDataURL(file);
  }

  onFileInputChange(event: any) {
    this.imgInput = true
  }

  submit() {
    this.profileServ.editProfileSettings(this.formData)
    .pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    )
    .subscribe((newUser: IServerResponse) => {
      this.storage.set('user', newUser)
      .subscribe(() => {
        location.reload();
      });
      this.getUsersData();
    })
    this.formData = {};
    this.imgInput = false
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalHelpComponent, {
      panelClass: 'modal-help'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  watchProfile(contact: IUserData) {
    console.log(contact)
  }

  lengthForm() {
    return Object.keys(this.formData).length > 0 ? true : false;
  }

  itemFormat(item: string) {
    return !!(item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif"));
  }
}
