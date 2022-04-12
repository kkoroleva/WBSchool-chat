import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectHomeGuardService {

  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('token')) {
      return true;
    }
    else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
