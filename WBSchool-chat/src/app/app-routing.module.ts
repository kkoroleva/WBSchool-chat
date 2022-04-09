import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: './**', redirectTo: '/home', pathMatch: 'full'},
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
