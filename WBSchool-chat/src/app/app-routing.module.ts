import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { authRoutes } from './auth/auth.module';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'auth', children: [...authRoutes]},
  {path: 'home', component: HomePageComponent},
  {path: 'chat', component: MessagesPageComponent},
  {path: 'alerts', component: NotificationsPageComponent},
  {path: 'profile', component: ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
