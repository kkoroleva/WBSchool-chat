import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
  
  logout() {
    this.auth.logout()
    this.router.navigate(["login"])
  }
}