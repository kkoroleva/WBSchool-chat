<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/services/auth.service';
=======
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
>>>>>>> 354af43352d84b4755348eb92d849bb03f029a18

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  path: string = window.location.pathname.substring(1);
<<<<<<< HEAD
  constructor(private auth: AuthService, private router: Router, private store$: Store) {}

  dispatchNotificationsList() {
=======

  constructor(private auth: AuthService, private router: Router) {
>>>>>>> 354af43352d84b4755348eb92d849bb03f029a18
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  logout() {
    this.auth.logout()
    this.router.navigate(["login"])
  }

  ngDoCheck() {
    this.path = window.location.pathname.substring(1);
  }
}

