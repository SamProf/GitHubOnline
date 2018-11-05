import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from '@angular/router';


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
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        useHash: true,
      } // <-- debugging purposes only
    )
    // other imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
