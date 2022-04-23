import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { authRoutes } from './auth/auth.module';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', children: [...authRoutes] },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'chat',
    component: MessagesPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'alerts',
    component: NotificationsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
