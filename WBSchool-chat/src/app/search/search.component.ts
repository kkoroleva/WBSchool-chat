import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() {}

  blankClick(): void {
    console.log('click')
  }

  ngOnInit(): void {
  }

}
