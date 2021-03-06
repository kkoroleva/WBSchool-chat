import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  navMobile: string = 'groups';
  ngOnInit() {
    if (localStorage.getItem('navMobileHome')) {
      this.navMobile = localStorage.getItem('navMobileHome')!;
    }
  }
}
