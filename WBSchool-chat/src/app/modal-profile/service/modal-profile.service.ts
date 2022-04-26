import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserData } from 'src/app/auth/interfaces';
import { ProfileSettingsService } from 'src/app/profile-page/services/profile-settings.service';
import { initContacts } from 'src/app/store/actions/contacts.actions';
import { IContacts } from 'src/app/store/reducers/contacts.reducers';
import { IGroupsState } from 'src/app/store/reducers/groups.reducers';
import { selectContacts } from 'src/app/store/selectors/contacts.selectors';
import { ModalProfileComponent } from '../modal-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ModalProfileService {
  userData: IUserData | undefined;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string,
    private store$: Store<IGroupsState>,
    private profileServ: ProfileSettingsService,
  ) { }

  async searchAndOpenDialog(username: string): Promise<void> {
    this.userData = undefined
    this.store$.dispatch(initContacts());
    console.log(0.5)
    await this.store$.pipe(select(selectContacts)).subscribe(async (contacts: IContacts) => {
        await contacts.contacts.map(contact => {
          if (contact.username == username) {
            this.userData = contact
          }
        })
        await console.log(1)
      })
    if (this.userData == undefined) {
      await this.profileServ.getUsers(username)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error);
          })
        )
        .subscribe((user: IUserData) => {
          this.userData = user
        });
        await console.log(2)
    }
    if (this.userData != undefined) await this.openDialog(this.userData)
    await console.log(this.userData)
    
    // this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
    //   contacts.contacts.map(contact => {
    //     if (contact.username == username) {
    //       this.userData = contact
    //     }
    //   })
    //   if (this.userData == undefined) {
    //     this.profileServ.getUsers(username)
    //       .pipe(
    //         catchError((error: HttpErrorResponse) => {
    //           return throwError(() => error);
    //         })
    //       )
    //       .subscribe((user: IUserData) => {
    //         this.userData = user
    //       });
    //   }
    // })
    // setTimeout(() => {
    //   if (this.userData != undefined) this.openDialog(this.userData)
    // }, 500);
  }

  openDialog(contactData: IUserData): void {
    const dialogRef = this.dialog.open(ModalProfileComponent, {
      panelClass: 'modal-profile',
      data: contactData
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  deleteContact(_id: string): Observable<IContacts> {
    return this.http.patch<IContacts>(`${this.apiUrl}/api/users/contacts`, {id: _id})
  }
}
