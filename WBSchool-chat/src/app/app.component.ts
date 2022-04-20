import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { initAuth } from './store/actions/auth.actions';
import { IAuthState } from './store/reducers/auth.reducers';
import { StorageMap } from '@ngx-pwa/local-storage';
import { initContacts } from './store/actions/contacts.actions';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { selectContacts } from './store/selectors/contacts.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store$: Store<IAuthState>, private storage: StorageMap, private http: HttpClient){}
  ngOnInit(): void {
    this.storage.get('user').subscribe((newUser: any) => {
      this.store$.dispatch(initAuth({newUser}));
    })
    console.log(localStorage.getItem('token'))
    // this.store$.dispatch(initContacts({contacts: []}));
    // this.store$.pipe(select(selectContacts)).subscribe((resp) => console.log(resp))
  }
}
