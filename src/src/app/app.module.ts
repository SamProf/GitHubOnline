import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GitHubService} from './services/git-hub.service';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClient, HttpClientModule} from '@angular/common/http';


const appRoutes: Routes = [
  {path: 'main', component: MainComponent},

  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
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
  ],
  providers: [
    GitHubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
