import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfilePageService } from './services/profile-page.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  constructor(public settServ: ProfilePageService) {}
}
