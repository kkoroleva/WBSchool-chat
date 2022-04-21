import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalProfileComponent } from '../modal-profile.component';

@Injectable({
  providedIn: 'root'
})
export class ModalProfileService {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalProfileComponent, {
      panelClass: 'modal-profile'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
