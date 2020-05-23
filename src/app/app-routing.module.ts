import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaunchComponent } from './pages/launch/launch.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthGuardService } from './core/guards/auth-guard.service'; 


const routes: Routes = [
  { path: '', redirectTo: 'launch', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: '', component: LaunchComponent },
   { path: 'launch', component: LaunchComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
   canLoad: [AuthGuardService]}
  
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LaunchComponent,
    WelcomeComponent
  ],
  imports: [RouterModule.forRoot(routes, {useHash: true}), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
