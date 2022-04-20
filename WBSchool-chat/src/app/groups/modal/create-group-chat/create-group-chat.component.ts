import { initContacts } from './../../../store/actions/contacts.actions';
import { GroupsService } from './../../groups.service';
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
import { selectContacts } from 'src/app/store/selectors/contacts.selectors';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'groups-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent implements OnInit {
  @ViewChild('contactsInput') contactsInput!: ElementRef<HTMLInputElement>;
  public form!: FormGroup;
  public imageName = '';
  public imageInBase64 = '';
  private inputFile!: HTMLInputElement;
  public contactsToGroup: { _id: string; username: string }[] = [];
  public contactsControl!: FormControl;
  public errMessage$: Observable<string> = this.store$.pipe(
    select(selectChatGroupError)
  );
  public contacts$: Observable<any[]> = this.store$.pipe(
    select(selectContacts)
  );
  separatorKeysCodes: number[] = [ENTER, COMMA];
  public contactsList: { _id: string; username: string }[] = [];
  public filteredContacts!: Observable<{ _id: string; username: string }[]>;

  constructor(
    private dialogRef: MatDialogRef<CreateGroupChatComponent>,
    private store$: Store<IGroupsState>,
    private actions$: Actions,
    private groupsService: GroupsService
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
      users: new FormControl(
        [],
        [Validators.required, Validators.minLength(2)]
      ),
    });

    this.contactsControl = this.form.get('users') as FormControl;

    this.actions$.pipe(ofType(pushToGroups)).subscribe(() => {
      this.dialogRef.close();
    });

    this.groupsService
      .getContacts()
      .subscribe((res) => (this.contactsList = res.contacts));

    this.filteredContacts = this.contactsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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
    const name: string = this.form.get('name')?.value;
    const about: string = this.form.get('about')?.value;
    const nameLength = name.trim().length;
    const aboutLength = about.trim().length;

    const group: IGroup = {
      name,
      users: this.contactsToGroup.map((user) => user._id),
    };

    if (nameLength < 4) {
      this.form.get('name')?.setErrors({ manySpaces: true });
    }

    if (aboutLength >= 1 && aboutLength < 4) {
      this.form.get('about')?.setErrors({ manySpaces: true });
    } else if (aboutLength >= 4) {
      group.about = about;
    }

    if (this.imageInBase64) {
      group.avatar = this.imageInBase64;
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

    observable.subscribe((image) => (this.imageInBase64 = image.split(',')[1]));
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

  remove(contact: { _id: string; username: string }): void {
    const idx = this.contactsToGroup.indexOf(contact);

    this.contactsList.push(contact);

    this.contactsToGroup.splice(idx, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.contactsToGroup.push({
      username: event.option.value.username,
      _id: event.option.value._id,
    });
    console.log(this.contactsControl.value);

    this.contactsList = this.contactsList.filter(
      (contact) => contact._id !== event.option.value._id
    );

    this.contactsInput.nativeElement.value = '';
    this.contactsControl.setValue(null);
  }

  private _filter(value: string): { _id: string; username: string }[] {
    const filterValue = value.toLowerCase();

    return this.contactsList.filter((contact) =>
      contact.username.toLowerCase().includes(filterValue)
    );
  }
}
