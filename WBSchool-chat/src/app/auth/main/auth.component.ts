import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `<section class="auth main-grid-block">
  <router-outlet></router-outlet>
  </section>`,
  styles: [`.auth { padding: 15px; }`]
})
export class AuthComponent {}
