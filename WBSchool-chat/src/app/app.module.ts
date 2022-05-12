import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AngularResizeEventModule } from 'angular-resize-event';

/*Components */
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountSettingsComponent } from './profile-page/components/account-settings/account-settings.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GroupsComponent } from './groups/groups.component';
import { ProfileSettingsComponent } from './profile-page/components/profile-settings/profile-settings.component';
import { DialogComponent } from './dialog/dialog.component';
import { DeleteModalComponent } from './profile-page/components/account-settings/delete-modal/delete-modal.component';
import { PasswordModalComponent } from './profile-page/components/account-settings/password-modal/password-modal.component';
import { CreateGroupChatComponent } from './groups/modal/create-group-chat/create-group-chat.component';
import { ThreadsComponent } from './threads/threads.component';
import { CopyrightComponent } from './copyright/copyright.component';

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
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';

/*Modules*/
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ModalHelpComponent } from './profile-page/components/profile-settings/modal-help/modal-help.component';
import { StorageModule } from '@ngx-pwa/local-storage';

/*Store*/
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HeaderComponent } from './dialog/headerDialog/header/header.component';
import { MessageComponent } from './dialog/messageDialog/message/message.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { CreatePrivateChatComponent } from './friends/create-private-chat/create-private-chat.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DragAndDropDirective } from './groups/drag-and-drop.directive';
import { EditGroupChatComponent } from './groups/modal/edit-group-chat/edit-group-chat.component';
import { PrivateComponent } from './friends/private.component';
import { OutFromGroupComponent } from './groups/modal/out-from-group/out-from-group.component';
import { AboutGroupComponent } from './groups/modal/about-group/about-group.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SmileComponent } from './smile/smile.component';

import { ChatsEffects } from './store/effects/chats.effects';
import { ContactsEffects } from './store/effects/contacts.effects';
import { DialogEffects } from './store/effects/dialog.effects';
import { GroupEffects } from './store/effects/group.effects';
import { NotificationEffects } from './store/effects/notification.effects';
import { ThreadsEffects } from './store/effects/threads.effects';
import { ModalWindowImgComponent } from './dialog/messageDialog/modal-window-img/modal-window-img.component';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

const API_URL_PROVIDER: Provider = {
  provide: 'API_URL',
  useValue: 'https://wbschool-chat.ru',
  // useValue: 'http://localhost:3001'
};

@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
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
    HeaderComponent,
    MessageComponent,
    NotFoundPageComponent,
    NavMobileComponent,
    CreatePrivateChatComponent,
    ModalProfileComponent,
    DragAndDropDirective,
    EditGroupChatComponent,
    OutFromGroupComponent,
    AboutGroupComponent,
    FeedbackComponent,
    SmileComponent,
    ModalWindowImgComponent,
    CopyrightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    StorageModule,
    AngularResizeEventModule,
    PickerModule,

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
    MatSelectModule,
    MatAutocompleteModule,
    MatBadgeModule,

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
    EffectsModule.forRoot([
      ChatsEffects,
      ContactsEffects,
      DialogEffects,
      GroupEffects,
      NotificationEffects,
      ThreadsEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  providers: [INTERCEPTOR_PROVIDER, NgxImageCompressService, API_URL_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
