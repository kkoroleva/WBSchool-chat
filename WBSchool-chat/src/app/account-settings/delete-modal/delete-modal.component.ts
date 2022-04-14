import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { IProfileData, IServerResponse } from 'src/app/profile-settings/interfaces/interface';
import { IUserDeleteData } from '../interface/account-settings';
import { AccountSettingsService } from '../service/account-settings.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  hide: boolean = true;
  profileData: IUserDeleteData = {
    id: '',
    password: ''
  };

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private accService: AccountSettingsService
  ) {}

  password = new FormControl("", [Validators.required, Validators.minLength(8)])

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUsersData() {
    this.accService.getUsersData()
    .subscribe((response: IServerResponse) => {
      console.log(response)
      this.profileData = Object.assign({}, {
        id: response['_id'],
        password: this.password.value
      })
    })
  }

  isPasswordInvalid(): boolean {
    return this.password.invalid
  }

  deleteAcc() {
    this.profileData.password = this.password.value
    this.accService.deleteUser(this.profileData)
      .pipe(
        catchError((error) => {
          console.log(error)
          this.dialogRef.close();
          return throwError(() => error);
        })
      )
      .subscribe((response: IServerResponse) => {
        console.log(response)
        this.dialogRef.close();
      })
  }

  ngOnInit(): void {
    this.getUsersData()
  }
}
