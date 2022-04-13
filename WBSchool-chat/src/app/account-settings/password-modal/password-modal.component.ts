import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent {
  hide: boolean = true;
  errorMsg: string = ''

  constructor(
    public dialogRef: MatDialogRef<PasswordModalComponent>,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    oldPsw: ["", [Validators.required]],
    newPsw: ["", [Validators.required, Validators.minLength(8)]],
    newPswAgain: ["", [Validators.required, Validators.minLength(8)]]
  })

  btnValidation(): boolean {
    if (this.form.value.newPsw == this.form.value.newPswAgain) {
      return true
    } 
    return false
  }

  /**
   * тестовый метод
   */
  submitNewPsw() {
    console.log(this.form.value.oldPsw)
    console.log(this.form.value.newPsw)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
