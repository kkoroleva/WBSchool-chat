import { NgModule, OnInit, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxImageCompressService } from 'ngx-image-compress';

/*Components */
import { AppComponent } from './app.component';
import { UnreadsComponent } from './unread/unread.component';
import { FriendsComponent } from './friends/friends.component';
import { SearchComponent } from './search/search.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { DialogComponent } from './dialog/dialog.component';
import { DeleteModalComponent } from './account-settings/delete-modal/delete-modal.component';
import { PasswordModalComponent } from './account-settings/password-modal/password-modal.component';
import { CreateGroupChatComponent } from './groups/modal/create-group-chat/create-group-chat.component';
import { ThreadsComponent } from './threads/threads.component';

/*Material UI modules */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

/*Modules*/
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ModalHelpComponent } from './profile-settings/modal-help/modal-help.component';
import { StorageModule } from '@ngx-pwa/local-storage';

/*Store*/
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { AppEffects } from './store/effects/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    UnreadsComponent,
    FriendsComponent,
    GroupsComponent,
    SearchComponent,
    ProfileSettingsComponent,
    MainPageComponent,
    HomePageComponent,
    NotificationsPageComponent,
    MessagesPageComponent,
    ProfilePageComponent,
    DialogComponent,
    NavbarComponent,
    ModalHelpComponent,
    AccountSettingsComponent,
    NotificationsComponent,
    AccountSettingsComponent,
    DeleteModalComponent,
    PasswordModalComponent,
    CreateGroupChatComponent,
    ThreadsComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    StorageModule,

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
    MatDividerModule,
    MatRippleModule,
    MatButtonToggleModule,
    MatDialogModule,

    //Forms
    FormsModule,
    ReactiveFormsModule,

    //Store
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],

  providers: [INTERCEPTOR_PROVIDER, NgxImageCompressService],
  bootstrap: [AppComponent],
})
export class AppModule {}
