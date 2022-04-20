import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUserData } from '../auth/interfaces';
import { addContact, initContacts } from '../store/actions/contacts.actions';
import { IContacts } from '../store/reducers/contacts.reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  contact!: any;
  contacts!: IUserData[];
  form!: FormGroup;
  private url = 'https://wbschool-chat.ru/api/users';

  constructor(private http: HttpClient, private store$: Store<IContacts>,) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.minLength(1)])
    })
    this.http.get(this.url).subscribe((resp: any) => {
      this.contacts = resp
    })
  }

  blankClick(): void {
    console.log('click')
  }

  submit() {
    const userName: string = this.form.value.search.trim();
    let contact: any = {};
    this.contact = this.contacts.find((user: IUserData) => user.username === userName);
    this.store$.dispatch(initContacts())
    console.log(this.contacts)
    console.log(this.contact)
    this.form.reset();
  }
}
