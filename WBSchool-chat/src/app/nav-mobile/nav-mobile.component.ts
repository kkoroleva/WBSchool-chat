import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMobileComponent {
  constructor(private router: Router) {}

  onLabelClick(e: Event) {
    if (this.router.url.includes('/home')) {
      localStorage.setItem(
        'navMobileHome',
        (e.target as HTMLElement).parentElement?.classList[0]!
      );
    } else {
      localStorage.setItem(
        'navMobileMessage',
        (e.target as HTMLElement).parentElement?.classList[0]!
      );
    }
  }
}
