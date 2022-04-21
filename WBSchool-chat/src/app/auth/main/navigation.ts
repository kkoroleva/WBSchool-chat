import { Component } from '@angular/core';

@Component({
  selector: 'auth-nav',
  template: `<div class="auth-nav">
  <button class="auth-nav__link" mat-raised-button color="primary" routerLink="/auth/login" routerLinkActive="auth-nav__link--active">Login</button>
  <button class="auth-nav__link" mat-raised-button color="primary" routerLink="/auth/register" routerLinkActive="auth-nav__link--active">Register</button>
</div>`,
  styles: [`
  .auth-nav {
    display: flex;
    gap: 4%;
    &__link {
      width: 48%;
    }
    &__link--active {
      opacity: 0.7;
    }
  }`]
})
export class AuthNav { }
