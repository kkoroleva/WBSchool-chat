import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-window-img',
  templateUrl: './modal-window-img.component.html',
  styleUrls: ['./modal-window-img.component.scss'],
})
export class ModalWindowImgComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalWindowImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
