import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { IUserData } from '../auth/interfaces';
import { IContacts } from '../store/reducers/contacts.reducers';
import { selectContacts } from '../store/selectors/contacts.selectors';
import { ModalProfileService } from './service/modal-profile.service';


@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss']
})
export class ModalProfileComponent implements OnInit {

  userData: IUserData = {
    email: this.data.email,
    username: this.data.username,
    userRights: this.data.userRights,
    avatar: this.data.avatar,
    about: this.data.about,
    _id: this.data._id,
    v: this.data.v,
    formatImage: this.data.formatImage
  }
  friendStatus: IUserData | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserData,
    private store$: Store,
    private modalProfileServ: ModalProfileService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
      console.log(this.userData)
      this.friendStatus = contacts.contacts.find((user: IUserData) => user.username === this.userData.username);
    })
  }

  chatOpen() {
    console.log('open chat');
  }

  addPerson() {
    console.log('adding friend');
  }

  deleteFriend() {
    console.log('deleting friend');
  }
}
