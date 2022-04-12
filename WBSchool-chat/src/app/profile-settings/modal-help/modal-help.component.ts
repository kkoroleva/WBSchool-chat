import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.component.html',
  styleUrls: ['./modal-help.component.scss']
})
export class ModalHelpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalHelpComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
