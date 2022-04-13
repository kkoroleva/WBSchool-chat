import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAcc() {
    console.log("Удаление аккаунта")
  }
}
