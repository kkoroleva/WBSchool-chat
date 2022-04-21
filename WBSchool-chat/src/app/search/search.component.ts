import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IUserData } from '../auth/interfaces';
import { initContacts } from '../store/actions/contacts.actions';
import { IContacts } from '../store/reducers/contacts.reducers';
import { selectContacts } from '../store/selectors/contacts.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  contact!: any;
  contacts!: IUserData[];
  form!: FormGroup;
  private url = `${this.apiUrl}/api/users`;

  constructor(
    private http: HttpClient,
    private store$: Store<IContacts>,
    @Inject('API_URL') public apiUrl: string
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl('', [Validators.minLength(1)]),
    });
    this.store$.dispatch(initContacts());
    this.http.get<IUserData[]>(this.url).subscribe((resp: IUserData[]) => {
      this.contacts = resp;
    });
  }

  blankClick(): void {
    console.log('click');
  }

  submit() {
    const userName: string = this.form.value.search.trim();

    this.contact = this.contacts.find(
      (user: IUserData) => user.username === userName
    );
    this.http
      .post<IContacts>(`${this.url}/contacts`, { id: this.contact._id })
      .subscribe(() => {});
    this.store$.dispatch(initContacts());

    this.form.reset();
  }
}
