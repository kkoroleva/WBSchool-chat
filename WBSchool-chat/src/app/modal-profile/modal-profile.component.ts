import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserData } from '../auth/interfaces';
import { initContacts } from '../store/actions/contacts.actions';
import { createChatFriend } from '../store/actions/groups.actions';
import { selectUser } from '../store/selectors/auth.selectors';
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
  private user$: Observable<IUserData> = this.store$.pipe(select(selectUser));

  constructor(
    public dialogRef: MatDialogRef<ModalProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserData,
    private modalServ: ModalProfileService,
    private store$: Store,
    private router: Router,
    @Inject('API_URL') public apiUrl: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  goToChat(_id: string) {
    let username = this.userData.username;
    this.user$.subscribe((user) => {
     this.store$.dispatch(
        createChatFriend({ username, ownerUsername: user.username })
      ); 
    });
    this.router.navigateByUrl('/home');
    this.dialogRef.close();
  }

  deleteContact(_id: string) {
    this.modalServ.deleteContact(_id)
    .subscribe(() => {
      this.store$.dispatch(initContacts());
      this.dialogRef.close();
    })
  }

}
