import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from '../profile-page/service/profile-page.service';

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
    public settServ: ProfilePageService) { }
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
  
  click(str: string) {
    console.log(str)
    // и тут через switch распределить по методам наши нажатия
  }

}
