import { Component } from '@angular/core';
import { ProfilePageService } from './service/profile-page.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  constructor(public settServ: ProfilePageService) { }
}
