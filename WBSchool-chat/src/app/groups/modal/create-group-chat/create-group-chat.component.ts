import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from './../../groups.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'groups-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private groupsService: GroupsService,
    private dialogRef: MatDialogRef<CreateGroupChatComponent>
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

  createGroupChat(): void {
    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      const about = this.form.get('about')?.value;

      this.groupsService
        .createGroupChat(name, [], about)
        .subscribe((group) => this.dialogRef.close(group));
    }
  }
}
