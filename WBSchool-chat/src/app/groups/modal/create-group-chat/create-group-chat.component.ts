import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from './../../groups.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, Observable, Subscriber } from 'rxjs';
import { IGroup } from '../../group';
import { Store } from '@ngrx/store';
import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import { createChatGroup } from 'src/app/store/actions/groups.actions';

@Component({
  selector: 'groups-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent implements OnInit {
  form!: FormGroup;
  errMessage = '';
  private imageInBase64 = '';

  constructor(
    private groupsService: GroupsService,
    private dialogRef: MatDialogRef<CreateGroupChatComponent>,
    private store$: Store<IGroupsState>,
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
      users: new FormControl('', [
        Validators.required,
        Validators.minLength(49),
      ]),
    });
  }

  getNameErrors(): string | void {
    if (this.form.get('name')?.hasError('required')) {
      return 'Enter group chat name';
    } else if (
      this.form.get('name')?.hasError('minlength') ||
      this.form.get('name')?.hasError('maxlength')
    ) {
      return 'Name must be between 4 and 40 characters';
    }
  }

  getAboutErrors(): string | void {
    if (
      this.form.get('about')?.hasError('minlength') ||
      this.form.get('about')?.hasError('maxlength')
    ) {
      return 'About chat must be between 4 and 100 characters';
    }
  }

  getUsersErrors(): string | void {
    if (
      this.form.get('users')?.hasError('required') ||
      this.form.get('users')?.hasError('minlength')
    ) {
      return 'You must add at least two users';
    }
  }

  createGroupChat(): void {
    if (this.form.valid) {
      const _id = '';
      const name = this.form.get('name')?.value;
      const about = this.form.get('about')?.value;
      const users: string[] = this.form.get('users')?.value.split(' ');

      const group: IGroup = {
        // _id,
        name,
        users,
      };

      if (about) {
        group.about = about;
      } else if (this.imageInBase64) {
        group.avatar = this.imageInBase64;
      }

      this.store$.dispatch(createChatGroup({group}))

      // this.groupsService
      //   .createGroupChat(group)
      //   .pipe(catchError((err) => (this.errMessage = err.error.message)))
      //   .subscribe((group) => {
      //     if (!this.errMessage) {
      //       this.dialogRef.close(group);
      //     }
      //   });
    }
  }

  uploadImage(e: Event): void {
    const image = (e.target as HTMLInputElement).files![0];

    this.imageToBase64(image);
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
