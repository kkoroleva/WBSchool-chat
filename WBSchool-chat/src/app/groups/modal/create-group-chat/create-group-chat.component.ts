import { selectContacts } from './../../../store/selectors/contacts.selectors';
import {
  initContacts,
  pushContacts,
} from './../../../store/actions/contacts.actions';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith, Subscriber } from 'rxjs';
import { IGroup } from '../../group';
import { select, Store } from '@ngrx/store';
import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import {
  chatGroupError,
  createChatGroup,
  pushToGroups,
} from 'src/app/store/actions/groups.actions';
import { selectChatGroupError } from 'src/app/store/selectors/groups.selectors';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipList } from '@angular/material/chips';
import { IUser } from '../../user';

@Component({
  selector: 'groups-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent implements OnInit {
  @ViewChild('contactsInput') contactsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contacts') contactsMatChipList!: MatChipList;

  public form!: FormGroup;
  public imageName = '';
  public imageInBase64 = '';
  public formatImage = '';
  private inputFile!: HTMLInputElement;
  public contactsControl = new FormControl();
  public contactsList: IUser[] = [];
  public errMessage$: Observable<string> = this.store$.pipe(
    select(selectChatGroupError)
  );
  public contacts$: Observable<IUser[]> = this.store$.pipe(
    select(selectContacts),
    map((contacts) => contacts.contacts)
  );

  constructor(
    private dialogRef: MatDialogRef<CreateGroupChatComponent>,
    private store$: Store<IGroupsState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),
      about: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      contacts: new FormControl(
        [],
        [Validators.required, Validators.minLength(2)]
      ),
    });

    this.actions$.pipe(ofType(pushToGroups)).subscribe(() => {
      this.dialogRef.close();
    });

    this.getContacts();
  }

  getContacts(): void {
    this.store$.dispatch(initContacts());

    this.actions$.pipe(ofType(pushContacts)).subscribe(({ contacts }) => {
      this.contactsList = contacts.contacts;

      this.contacts$ = this.contactsControl.valueChanges.pipe(
        startWith(''),
        map((username: string | null) =>
          username ? this.filterContacts(username) : this.contactsList
        )
      );
    });
  }

  createGroupChat(): void {
    const group = this.createGroupObject();

    if (this.form.valid) {
      this.store$.dispatch(createChatGroup({ group }));

      this.dialogRef.afterClosed().subscribe(() => {
        this.store$.dispatch(chatGroupError({ error: '' }));
      });
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
      users: contacts.map((contact) => contact._id!),
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

    if (contactsValue.length + 1 < 2) {
      this.contactsMatChipList.errorState = true;
    } else {
      this.contactsMatChipList.errorState = false;
    }

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
