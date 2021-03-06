import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { IServerResponse } from '../../../../../interfaces/profile.settings.interface';
import { IUserDeleteData } from '../../../../../interfaces/account.settings-interface';
import { AccountSettingsService } from '../../../services/account-settings.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteModalComponent implements OnInit {
  hide: boolean = true;
  profileData: IUserDeleteData = {
    id: '',
    password: '',
  };

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private accService: AccountSettingsService,
    private router: Router,
    private auth: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUsersData() {
    this.accService.getUsersData().subscribe((response: IServerResponse) => {
      console.log(response);
      this.profileData = Object.assign(
        {},
        {
          id: response['_id'],
          password: this.password.value,
        }
      );
      this.changeDetectorRef.markForCheck();
    });
  }

  isPasswordInvalid(): boolean {
    return this.password.invalid;
  }

  deleteAcc() {
    this.profileData.password = this.password.value;
    this.accService
      .deleteUser(this.profileData)
      .pipe(
        catchError((error) => {
          console.log(error);
          this.dialogRef.close();
          this.auth.logout();
          this.router.navigateByUrl('/login');
          return throwError(() => error);
        })
      )
      .subscribe((response: IServerResponse) => {
        console.log(response);
        this.dialogRef.close();
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnInit(): void {
    this.getUsersData();
  }
}
