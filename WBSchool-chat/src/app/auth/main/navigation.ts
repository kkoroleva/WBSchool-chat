import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-nav',
  template: `<nav class="auth-nav">
    <button
      class="auth-nav__link"
      mat-raised-button
      color="primary"
      routerLink="/auth/login"
      routerLinkActive="auth-nav__link--active"
    >
      Login
    </button>
    <button
      class="auth-nav__link"
      mat-raised-button
      color="primary"
      routerLink="/auth/register"
      routerLinkActive="auth-nav__link--active"
    >
      Register
    </button>
  </nav>`,
  styles: [
    `
      .auth-nav {
        display: flex;
        gap: 4%;
        &__link {
          width: 48%;
        }
        &__link--active {
          opacity: 0.7;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNav {}
