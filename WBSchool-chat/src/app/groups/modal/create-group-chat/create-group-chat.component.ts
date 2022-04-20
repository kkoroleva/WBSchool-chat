import { GroupsService } from './../../groups.service';
import { Actions, ofType } from '@ngrx/effects';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { IGroup } from '../../group';
import { select, Store } from '@ngrx/store';
import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import {
  chatGroupError,
  createChatGroup,
  pushToGroups,
} from 'src/app/store/actions/groups.actions';
import { selectChatGroupError } from 'src/app/store/selectors/groups.selectors';

@Component({
  selector: 'groups-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent implements OnInit {
  public form!: FormGroup;
  public imageName = '';
  public imageInBase64 = '';
  private inputFile!: HTMLInputElement;
  public contactsList: any[] = [];
  public contacts!: FormControl;
  public errMessage$: Observable<string> = this.store$.pipe(
    select(selectChatGroupError)
  );

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

    this.contacts = this.form.get('users') as FormControl;

    this.actions$.pipe(ofType(pushToGroups)).subscribe(() => {
      this.dialogRef.close();
    });

    this.groupsService
      .getContacts()
      .subscribe((res) => (this.contactsList = res[0].contacts));
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
    const users: any[] = this.form.get('users')?.value;
    const name: string = this.form.get('name')?.value;
    const about: string = this.form.get('about')?.value;
    const nameLength = name.trim().length;
    const aboutLength = about.trim().length;

    const group: IGroup = {
      name,
      users: users.map((user) => user._id),
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
}
