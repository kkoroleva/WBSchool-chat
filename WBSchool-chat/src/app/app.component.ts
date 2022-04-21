import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store$: Store<IAuthState>, private storage: StorageMap) {}
  ngOnInit(): void {
    this.storage.get('user').subscribe((newUser: any) => {
      this.store$.dispatch(initAuth({ newUser }));
    });
    console.log(localStorage.getItem('token'));
  }
}
