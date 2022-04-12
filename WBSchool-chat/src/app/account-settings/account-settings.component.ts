import { Component, OnInit } from '@angular/core';

interface btnList {
  "icon": string,
  "title": string
}

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  constructor() { }
  settingsList: btnList[] = [
    {
      "icon": "key",
      "title": "Account"
    },
    {
      "icon": "dark_mode",
      "title": "Theme"
    },
    {
      "icon": "security",
      "title": "Security"
    },
    {
      "icon": "privacy_tip",
      "title": "Privacy"
    },
    {
      "icon": "domain_verification",
      "title": "Verification"
    },
    {
      "icon": "autorenew",
      "title": "Change number"
    },
    {
      "icon": "backup",
      "title": "Backup"
    },
    {
      "icon": "sms",
      "title": "Message settings"
    },
    {
      "icon": "public",
      "title": "App language"
    },
    {
      "icon": "delete",
      "title": "Delete Account"
    }
  ]
  
  click(str: string) {
    console.log(str)
    // и тут через switch распределить по методам наши нажатия
  }

}
