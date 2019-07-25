import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GitHubService} from './services/git-hub.service';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LogService} from './services/log.service';
import {NgxLoadingModule} from 'ngx-loading';
import {AppService} from './services/app.service';
import {AuthGuardService} from './services/auth-guard.service';
import { InfoComponent } from './components/info/info.component';
import {FormsModule} from '@angular/forms';


const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuardService],

  },
  {
    path: 'info',
    component: InfoComponent,
  },

  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',

  },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        useHash: true,
      },
    ),
    MatToolbarModule,
    NgxLoadingModule.forRoot({}),
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,

  ],
  providers: [
    GitHubService,
    LogService,
    AppService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
