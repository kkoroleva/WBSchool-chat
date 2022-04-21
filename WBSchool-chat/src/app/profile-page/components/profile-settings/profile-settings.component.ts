import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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
import { HttpClient } from '@angular/common/http';
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

  users: IUserData[] = [];

  imageOrFile: string = '';
  formatImage: string = '';

  imgInput: boolean = false;
  lookContacts: boolean = false;
  contact!: any;
  notFound: string = '';
  form!: FormGroup;
  contacts: IUserData[] = [];

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
    private store$: Store,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService,
    public modalProfileServ: ModalProfileService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      contactInput: new FormControl('', [Validators.required, Validators.minLength(1)])
    })
    this.getUsersData();
    this.http.get<IUserData[]>(this.url).subscribe((resp: IUserData[]) => {
      this.users = resp
    });
    this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
      this.contacts = contacts.contacts
    })
    this.store$.dispatch(initContacts());
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
    this.modalProfileServ.openDialog(contact)
  }

  lengthForm() {
    return Object.keys(this.formData).length > 0 ? true : false;
  }

  addFriend() {
    const userName: string = this.form.value.contactInput.trim();
    this.contact = this.users.find((user: IUserData) => user.username === userName);
    if (this.contact != undefined) {
      this.http.post<IContacts>(`${this.url}/contacts`, {id: this.contact._id}).subscribe(() => {});
    }
    else {
      this.notFound = 'Данного пользователя не существует.'
    }
    this.store$.dispatch(initContacts());
    this.form.reset();
  }

  itemFormat(item: string) {
    return !!(item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg") || item.includes(".svg") || item.includes(".gif"));
  }
}
