import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IUserData } from '../auth/interfaces';
import { initContacts } from '../store/actions/contacts.actions';
import { IContacts } from '../store/reducers/contacts.reducers';
import { selectContacts } from '../store/selectors/contacts.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  contact!: any;
  myContacts!: IUserData[];
  form!: FormGroup;
  private url = 'https://wbschool-chat.ru/api/users';

  constructor(private http: HttpClient, private store$: Store<IContacts>,) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.minLength(1)])
    })
    this.store$.dispatch(initContacts());
    this.store$.pipe(select(selectContacts)).subscribe((contacts: IContacts) => {
      this.myContacts = contacts.contacts
    })
  }

  blankClick(): void {
    console.log('click')
  }

  submit() {
    let users: IUserData[] = [];
    this.http.get<IUserData[]>(this.url).subscribe((resp: IUserData[]) => {
      users = resp
    });
    const userName: string = this.form.value.search.trim();
    this.contact = users.find((user: IUserData) => user.username === userName);
    this.http.post<IContacts>(`${this.url}/contacts`, {id: this.contact._id}).subscribe(() => {});
    this.store$.dispatch(initContacts());
    this.form.reset();
  }
}
