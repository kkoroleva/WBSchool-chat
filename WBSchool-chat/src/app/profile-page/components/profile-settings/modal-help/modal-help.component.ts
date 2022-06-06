import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-help',
  templateUrl: './modal-help.component.html',
  styleUrls: ['./modal-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHelpComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalHelpComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
