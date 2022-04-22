import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUserData } from 'src/app/auth/interfaces';
import { ModalProfileComponent } from '../modal-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ModalProfileService {
  constructor (
    public dialog: MatDialog
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
}
