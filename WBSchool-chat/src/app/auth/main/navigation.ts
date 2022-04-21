import { Component } from '@angular/core';

@Component({
  selector: 'auth-nav',
  template: `<nav class="auth-nav">
  <button class="auth-nav__link" mat-raised-button color="primary" routerLink="/auth/login" routerLinkActive="auth-nav__link--active">Login</button>
  <button class="auth-nav__link" mat-raised-button color="primary" routerLink="/auth/register" routerLinkActive="auth-nav__link--active">Register</button>
</nav>`,
  styles: [`
  .auth-nav {
    display: flex;
<<<<<<< HEAD
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
  @media(max-width: 425px) {
    button {
        width: 100px;
=======
    gap: 4%;
    &__link {
      width: 48%;
>>>>>>> 9d3af3bc6b7f68f82f0a536c808a14415066f26d
    }
    &__link--active {
      opacity: 0.7;
    }
  }`]
})
export class AuthNav { }
