import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAuthState } from '../store/reducers/auth.reducers';
import { selectUser } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
