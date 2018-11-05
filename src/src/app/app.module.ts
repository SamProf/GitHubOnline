import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        useHash: true,
      },
    ),
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
