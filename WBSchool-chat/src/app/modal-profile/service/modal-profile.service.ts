import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, Subscription, throwError } from 'rxjs';
import { IUserData } from '../../../interfaces/auth-interface';
import { ProfileSettingsService } from './../../profile-page/services/profile-settings.service';
import { initContacts } from './../../store/actions/contacts.actions';
import { IContactsState } from './../../store/reducers/contacts.reducers';
import { IGroupsState } from './../../store/reducers/groups.reducers';
import { selectContacts } from './../../store/selectors/contacts.selectors';
import { ModalProfileComponent } from '../modal-profile.component';

@Injectable({
  providedIn: 'root',
})
export class ModalProfileService {
  userData: IUserData | null = null;
  sub: Subscription | undefined;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string,
    private store$: Store<IGroupsState>,
    private profileServ: ProfileSettingsService
  ) {}

  searchAndOpenDialog(username: string) {
    this.userData = null;
    this.store$.dispatch(initContacts());
    this.sub = this.store$
      .pipe(select(selectContacts))
      .subscribe((contacts: IContactsState) => {
        contacts.contacts.map((contact) => {
          if (contact.username == username) {
            if (!this.userData) this.openDialog(contact);
            this.userData = contact;
          }
        });
        this.profileServ
          .getUsers(username)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              return throwError(() => error);
            })
          )
          .subscribe((user: IUserData) => {
            if (!this.userData) this.openDialog(user);
            this.userData = user;
          });
      });
  }

  openDialog(contactData: IUserData): void {
    const dialogRef = this.dialog.open(ModalProfileComponent, {
      panelClass: 'modal-profile',
      data: contactData,
    });

    dialogRef.afterClosed().subscribe(() => {
      if (!this.sub) {
        return;
      }
      this.sub.unsubscribe();
    });
  }

  deleteContact(_id: string): Observable<IContactsState> {
    return this.http.patch<IContactsState>(
      `${this.apiUrl}/api/users/contacts`,
      { id: _id }
    );
  }
}
