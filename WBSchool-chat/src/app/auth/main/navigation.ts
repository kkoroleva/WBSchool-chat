import { Component } from '@angular/core';

@Component({
  selector: 'auth-nav',
  template: `<nav class="nav">
  <button mat-raised-button routerLink="/login" routerLinkActive="active">Login</button>
  <button mat-raised-button routerLink="/register" routerLinkActive="active" >Register</button>
</nav>`,
  styles: [`
  .nav {
    display: flex;
  }
  .nav button {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 180px;
    background: blue;
  }
  .active {
    border: 1px solid red;
  }
  @media(max-width: 420px) {
    button {
        width: 100px;
    }
}
  `]
})
export class AuthNav{}