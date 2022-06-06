import { selectUser } from './../../../store/selectors/auth.selectors';
import { IUser } from '../../../../interfaces/user.groups-interface';
import { Actions, ofType } from '@ngrx/effects';
import {
  selectGroup,
  selectGroupUsers,
} from './../../../store/selectors/groups.selectors';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, startWith, Subscriber, tap, zip } from 'rxjs';
import { IGroupsState } from './../../../store/reducers/groups.reducers';
import { IGroup } from '../../../../interfaces/group-interface';
import {
  changeChatGroup,
  deleteFromGroups,
  deleteGroup,
  editGroup,
  editToGroups,
  getGroupUsers,
  setGroupUsers,
} from './../../../store/actions/groups.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectContacts } from './../../../store/selectors/contacts.selectors';
import { initContacts } from './../../../store/actions/contacts.actions';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipList } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-group-chat',
  templateUrl: './edit-group-chat.component.html',
  styleUrls: ['./../../groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGroupChatComponent implements OnInit {
  @ViewChild('contactsInput') contactsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contacts') contactsMatChipList!: MatChipList;

  public form!: FormGroup;
  public group$: Observable<IGroup> = this.store$.pipe(select(selectGroup));
  public imageName = '';
  public imageInBase64 = '';
  public formatImage = '';
  private inputFile!: HTMLInputElement;
  public contactsControl = new FormControl();
  private chatId!: string;
  private user!: IUser;
  public contactsList: IUser[] = [];
  public contactsIsLoaded = false;
  public contacts$: Observable<IUser[]> = this.store$.pipe(
    select(selectContacts),
    map((contacts) => contacts.contacts)
  );
  public groupUsers$: Observable<IUser[]> = this.store$.pipe(
    select(selectGroupUsers)
  );
  public user$: Observable<IUser> = this.store$.pipe(select(selectUser));

  constructor(
    private dialogRef: MatDialogRef<EditGroupChatComponent>,
    private store$: Store<IGroupsState>,
    private actions$: Actions,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.user = user;
      this.changeDetectorRef.markForCheck();
    });

    this.group$.subscribe((group) => {
      this.chatId = group._id!;

      this.form = new FormGroup({
        name: new FormControl(group.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ]),
        about: new FormControl(group.about, [
          Validators.minLength(4),
          Validators.maxLength(100),
        ]),
        contacts: new FormControl(group.users, [
          Validators.required,
          Validators.minLength(2),
        ]),
      });
      this.changeDetectorRef.markForCheck();
    });

    this.actions$.pipe(ofType(editToGroups, deleteFromGroups)).subscribe(() => {
      this.dialogRef.close();
      this.changeDetectorRef.markForCheck();
    });

    this.getContacts();
  }

  ngDoCheck(): void {
    if (this.contactsMatChipList) {
      if (this.form.get('contacts')?.value.length < 2) {
        this.contactsMatChipList.errorState = true;
      } else {
        this.contactsMatChipList.errorState = false;
      }
    }
  }

  getContacts(): void {
    this.store$.dispatch(initContacts());
    this.store$.dispatch(getGroupUsers({ id: this.chatId }));

    zip(this.contacts$, this.groupUsers$)
      .pipe(
        tap(() => {
          this.actions$.pipe(ofType(setGroupUsers)).subscribe(() => {
            this.contactsIsLoaded = true;
            this.changeDetectorRef.markForCheck();
          });
        })
      )
      .subscribe((contactsAndUsers) => {
        let cloneContacts = [...contactsAndUsers[0]];
        let cloneGroupUsers = [...contactsAndUsers[1]];

        cloneGroupUsers = cloneGroupUsers.filter(
          (groupUser) => groupUser._id !== this.user._id
        );

        this.form.get('contacts')?.patchValue(cloneGroupUsers);

        cloneGroupUsers.forEach((user) => {
          cloneContacts = cloneContacts.filter(
            (contact) => user._id !== contact._id
          );
        });

        this.contactsList = cloneContacts;

        this.contacts$ = this.contactsControl.valueChanges.pipe(
          startWith(''),
          map((username: string | null) =>
            username ? this.filterContacts(username) : this.contactsList
          )
        );
        this.changeDetectorRef.markForCheck();
      });
  }

  deleteGroupChat(): void {
    this.store$.dispatch(deleteGroup({ id: this.chatId }));
    this.store$.dispatch(changeChatGroup({ chatGroup: '', isPrivate: false }));
    this.router.navigateByUrl('/home');
    localStorage.removeItem('chatID');
  }

  editGroupChat(): void {
    const group = this.createGroupObject();

    if (this.form.valid) {
      this.store$.dispatch(editGroup({ id: this.chatId, editGroup: group }));
    }
  }

  createGroupObject(): IGroup {
    const contacts: IUser[] = this.form.get('contacts')?.value;
    const name: string = this.form.get('name')?.value;
    const about: string = this.form.get('about')?.value;
    const nameLength = name.trim().length;
    const aboutLength = about.trim().length;

    const group: IGroup = {
      name,
      users: contacts.map((contact) => contact._id!).concat([this.user._id!]),
    };

    if (nameLength < 4) {
      this.form.get('name')?.setErrors({ manySpaces: true });
    }

    if (aboutLength >= 1 && aboutLength < 4) {
      this.form.get('about')?.setErrors({ manySpaces: true });
    } else if (aboutLength >= 4) {
      group.about = about;
    }

    if (this.imageInBase64 && this.formatImage) {
      group.avatar = this.imageInBase64;
      group.formatImage = this.formatImage;
    }

    return group;
  }

  deleteImage(): void {
    this.inputFile.value = '';
    this.imageInBase64 = '';
    this.imageName = '';
  }

  uploadImage(e: Event): void {
    this.inputFile = e.target as HTMLInputElement;
    const image = this.inputFile.files![0];

    if (image) {
      this.imageName = image.name;
      this.imageToBase64(image);
    }
  }

  imageToBase64(image: File) {
    const observable = new Observable((sub: Subscriber<string>) =>
      this.readFile(sub, image)
    );

    observable.subscribe((image) => {
      const splitImage = image.split(',');

      this.formatImage = splitImage[0] + ',';
      this.imageInBase64 = splitImage[1];
      this.changeDetectorRef.markForCheck();
    });
  }

  readFile(sub: Subscriber<string | null | ArrayBuffer>, image: File) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(image);

    fileReader.onload = () => {
      sub.next(fileReader.result);
      sub.complete();
    };

    fileReader.onerror = (err) => {
      sub.error(err);
    };
  }

  removeContact(contact: IUser): void {
    const contacts = this.form.get('contacts') as FormControl;
    const contactsValue = contacts.value as IUser[];

    contacts.patchValue(
      contactsValue.filter((user) => user._id !== contact._id)
    );

    this.contactsList.push(contact);
  }

  selectContact(event: MatAutocompleteSelectedEvent): void {
    const contacts = this.form.get('contacts') as FormControl;
    const contactsValue = contacts.value as IUser[];
    const contact: IUser = {
      username: event.option.value.username,
      _id: event.option.value._id,
      avatar: event.option.value.avatar,
      formatImage: event.option.value.formatImage,
    };

    contacts.patchValue([...contactsValue, contact]);

    this.contactsList = this.contactsList.filter(
      (contact) => contact._id !== event.option.value._id
    );

    this.contactsInput.nativeElement.value = '';
    this.contactsControl.setValue(null);
  }

  private filterContacts(username: string): IUser[] {
    const filterUsername =
      typeof username === 'string' ? username.toLowerCase() : '';

    return this.contactsList.filter((contact) =>
      contact.username.toLowerCase().includes(filterUsername)
    );
  }
}
