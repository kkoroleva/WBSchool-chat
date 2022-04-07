import { Component } from '@angular/core';

@Component({
  selector: 'auth-nav',
  template: `<nav class="nav">
  <button mat-raised-button color="primary" routerLink="/login" routerLinkActive="active">Login</button>
  <button mat-raised-button color="primary" routerLink="/register" routerLinkActive="active" >Register</button>
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
  }
  `]
})
export class AuthNav{}