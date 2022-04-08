import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './main/auth.component';
import { AuthNav } from './main/navigation';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';

export const authRoutes: Routes = [
  {path: '', component: AuthComponent, children: [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'test', component: TestComponent},
  ]}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    AuthNav,
    TestComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
