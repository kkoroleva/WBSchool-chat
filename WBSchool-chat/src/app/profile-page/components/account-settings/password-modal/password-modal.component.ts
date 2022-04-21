import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { IProfileData, IServerResponse } from 'src/app/profile-page/interfaces/profile-settings';
import { IFormData, IPasswordEditData } from '../../../interfaces/account-settings';
import { AccountSettingsService } from '../../../services/account-settings.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit {
  hide: boolean = true;
  pswChanged: boolean = false;
  errorMsg: string = '';
  errStat: boolean = false;
  profileData: IProfileData = {
    username: '',
    email: '',
    about: ''
  };

  constructor(
    public dialogRef: MatDialogRef<PasswordModalComponent>,
    private fb: FormBuilder,
    private accService: AccountSettingsService
  ) {}

  form = this.fb.group({
    oldPsw: ["", [Validators.required, Validators.minLength(8)]],
    newPsw: ["", [Validators.required, Validators.minLength(8)]]
  })

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result
  }

  submitNewPsw() {
    const email: string | undefined = this.profileData.email
    if (email) {
      const editPswSet: IPasswordEditData = {
        "email": email,
        "password": this.form.value.oldPsw,
        "newPassword": this.form.value.newPsw,
      }
      this.accService.editPassword(editPswSet)
      .pipe(
        catchError((error) => {
          this.errStat = true;
          this.form.controls['oldPsw'].reset();
          setTimeout(() => {
            this.errStat = false;
          }, 1000);
          return throwError(() => error);
        })
      )
      .subscribe((response: IServerResponse) => {
        console.log(response)
        this.pswChanged = true;
        setTimeout(() => {
          this.dialogRef.close();
          this.pswChanged = false;
        }, 1500);
      })
    } 
    
    console.log(this.profileData.email)
    console.log(this.form.value.oldPsw)
    console.log(this.form.value.newPsw)
  }

  getUsersData() {
    this.accService.getUsersData()
    .subscribe((response: IServerResponse) => {
      this.profileData = Object.assign({}, {
        username: response.username,
        about: response.about,
        email: response.email
      })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getUsersData()
  }
}
