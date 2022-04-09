import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

/*Components */
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {NavbarComponent} from './navbar/navbar.component';


/*Modules*/


/*Material UI modules */
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule,} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { HomePageComponent } from './home-page/home-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HomePageComponent,
    NotificationsPageComponent,
    MessagesPageComponent,
    ProfilePageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,


    //Material UI
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,


    //Forms
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
