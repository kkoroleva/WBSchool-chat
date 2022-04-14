import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfilePageService } from '../profile-page/service/profile-page.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { AccountSettingsService } from './service/account-settings.service';

interface btnList {
  "icon": string,
  "title": string,
  "disabled": boolean
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  constructor(
    public settServ: ProfilePageService, 
    public dialog: MatDialog
  ) { }

  settingsList: btnList[] = [
    {
      "icon": "key",
      "title": "Account",
      "disabled": false
    },
    {
      "icon": "dark_mode",
      "title": "Theme",
      "disabled": true
    },
    {
      "icon": "security",
      "title": "Security",
      "disabled": true
    },
    {
      "icon": "privacy_tip",
      "title": "Privacy",
      "disabled": true
    },
    {
      "icon": "domain_verification",
      "title": "Verification",
      "disabled": true
    },
    {
      "icon": "autorenew",
      "title": "Change number",
      "disabled": true
    },
    {
      "icon": "backup",
      "title": "Backup",
      "disabled": true
    },
    {
      "icon": "sms",
      "title": "Message settings",
      "disabled": true
    },
    {
      "icon": "public",
      "title": "App language",
      "disabled": true
    },
    {
      "icon": "delete",
      "title": "Delete Account",
      "disabled": false
    }
  ]
  
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: 'delete-modal'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openAccountDialog(): void {
    const dialogRef = this.dialog.open(PasswordModalComponent, {
      panelClass: 'password-modal',
      width: '250'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  click(str: string) {
    switch (str) {
      case 'Account':
        console.log('Вызов Account')
        this.openAccountDialog()
        break;
      case 'Delete Account':
        console.log('Вызов Delete Account')
        this.openDeleteDialog()
        break;
      default:
        break;
    }
  }
}
