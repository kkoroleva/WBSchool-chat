import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, Subject, Subscription, tap, throwError } from 'rxjs';
import { ProfileSettingsService } from '../../services/profile-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalHelpComponent } from './modal-help/modal-help.component';
import { IProfileData, IServerResponse, ISettingsList } from '../../interfaces/profile-settings';
import { ProfilePageService } from '../../services/profile-page.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IUserData } from '../../../auth/interfaces';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../store/selectors/auth.selectors';
import { selectContacts } from '../../../store/selectors/contacts.selectors';
import { IContacts } from '../../../store/reducers/contacts.reducers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initContacts } from '../../../store/actions/contacts.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalProfileService } from 'src/app/modal-profile/service/modal-profile.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  private url = 'https://wbschool-chat.ru/api/users';
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
  lookContacts: boolean = false;
  notFound: string = '';
  form!: FormGroup;
  contacts: IUserData[] = [];
  sub$!: Subscription;

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
    private store$: Store,
    private imageCompress: NgxImageCompressService,
    public modalProfileServ: ModalProfileService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      contactInput: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
    this.getUsersData();
    this.store$.dispatch(initContacts());
    setTimeout(() => {
      this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
        this.contacts = contacts.contacts;
      })
    }, 0);
  }

  getUsersData() {
    this.storage.get('user')
    .subscribe((user: IServerResponse | any) => {
      this.profileData = {
        username: user.username,
        about: user.about,
        avatar: user.formatImage + user.avatar,
        email: user.email
      }
      this.settingsList[0].description = user.username;
      this.settingsList[3].description = user.about;
      this.settingsList[4].description = user.email;
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
    } 
    else if (inputData.id == 3) {
      this.formData.avatar = btoa(inputData.value)
    } 
    else if (inputData.id == 4) {
      if (inputData.value.length >= 4 && inputData.value.length <= 100) {
        this.formData.about = inputData.value;
        this.errorMsg = false
      } 
      else this.errorMsg = 'Description error'
    } 
    else if (inputData.id == 5) {
      if (inputData.value.length >= 4 && inputData.value.length <= 100 && 
          inputData.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.formData.email = inputData.value;
        this.errorMsg = false
      } 
      else this.errorMsg = 'Email error'
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
            this.formData.avatar = result.slice(imageOrFile.indexOf(',') + 1);
            this.formData.formatImage = result.slice(0, imageOrFile.indexOf(',') + 1);
          });
        } else {
          this.formData.avatar = imageOrFile.slice(imageOrFile.indexOf(',') + 1);
          this.formData.formatImage = imageOrFile.slice(0, imageOrFile.indexOf(',') + 1);
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
    .subscribe((user: IServerResponse) => {
      this.storage.set('user', user).subscribe(() => {});
      this.getUsersData();
    })
    this.formData = {};
    this.imgInput = false;
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
    this.modalProfileServ.openDialog(contact)
  }

  lengthForm() {
    return Object.keys(this.formData).length > 0 ? true : false;
  }

  addFriend() {
    this.notFound = '';
    const userName: string = this.form.value.contactInput.trim();
    const clone: IUserData | undefined = this.contacts.find((user) => user.username === userName);
    let me: string | undefined;
    this.store$.pipe(select(selectUser))
    .subscribe((user: IUserData) => me = user.username);
    if (userName === clone?.username) {
      this.notFound = 'Этот пользователь уже есть в списке контактов.'
    }
    else if (userName === me) {
      this.notFound = 'Вы не можете внести самого себя в список контактов.'
    }
    else {
      this.profileServ.getUsers(userName)
      .pipe(
        concatMap(
          (user: IUserData) => this.profileServ.addFriend(user._id)
        ),
        catchError((error: HttpErrorResponse) => {
          this.notFound = 'Данного пользователя не существует.';
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.store$.dispatch(initContacts());
      });
    }
    this.form.reset();
  }

  itemFormat(item: string) {
    return !!(item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif"));
  }
}