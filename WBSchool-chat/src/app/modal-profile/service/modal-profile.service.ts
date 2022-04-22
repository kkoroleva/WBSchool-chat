import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IUserData } from 'src/app/auth/interfaces';
import { IContacts } from 'src/app/store/reducers/contacts.reducers';
import { ModalProfileComponent } from '../modal-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ModalProfileService {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string
  ) { }

  openDialog(contactData: IUserData): void {
    const dialogRef = this.dialog.open(ModalProfileComponent, {
      panelClass: 'modal-profile',
      data: contactData
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  deleteContact(_id: string): Observable<IContacts> {
    return this.http.patch<IContacts>(`${this.apiUrl}/api/users/contacts`, _id)
  }
}
