import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { defer, finalize, Observable } from 'rxjs';
import { IUserData } from '../auth/interfaces';
import { ProfileSettingsService } from '../profile-page/services/profile-settings.service';
import { IPrivate } from '../friends/private';
import { initContacts } from '../store/actions/contacts.actions';
import { changeChatGroup, createChatFriend, loadFriends } from '../store/actions/groups.actions';
import { IContacts } from '../store/reducers/contacts.reducers';
import { selectUser } from '../store/selectors/auth.selectors';
import { selectContacts } from '../store/selectors/contacts.selectors';
import { selectFriends } from '../store/selectors/groups.selectors';
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
  friendStatus = false;
  hideData = false;
  contacts: IUserData[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserData,
    private modalServ: ModalProfileService,
    private store$: Store,
    private router: Router,
    @Inject('API_URL') public apiUrl: string,
    private profileServ: ProfileSettingsService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.store$.dispatch(initContacts())
    this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
      this.friendStatus = !!contacts.contacts.find((user: IUserData) => user.username === this.userData.username);
      this.contacts = contacts.contacts;
    })
  }

  goToChat(_id: string) {
    const username = this.userData.username.trim();
    let clone: IPrivate | undefined;
    this.store$.pipe(select(selectFriends))
      .subscribe((chats: IPrivate[]) => {
        clone = chats.find((chat: IPrivate) => chat.usernames[0] === username || chat.usernames[1] === username);
      })
    setTimeout(() => {
      if (!clone) {
        this.user$.subscribe({
            next: user => this.store$.dispatch(
              createChatFriend({ username, ownerUsername: user.username, ownerFormatImage: user.formatImage!, ownerAvatar: user.avatar! })
            )
        });
        setTimeout(() => {
          this.router.navigateByUrl('/home')
        }, 0);
      }
      else {
          this.store$.dispatch(changeChatGroup({ chatGroup: clone._id! }));
          this.router.navigateByUrl('/chat');
      }
      this.dialogRef.close();
    }, 1);
  }

  deleteContact(_id: string) {
    this.modalServ.deleteContact(_id)
    .subscribe(() => {
      this.store$.dispatch(initContacts());
    })
  }

  openImg() {
    this.hideData = !this.hideData
  }

  addToFriends(userId: string) {
    if (!this.contacts.find((userCont) => userCont._id === userId)) {
      this.profileServ.addFriend(userId).subscribe(() => {
        this.store$.dispatch(initContacts());
      }) 
    }
  }
}
