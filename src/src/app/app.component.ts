import {Component, OnInit} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig, GitHubService} from './services/git-hub.service';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'GitHubOnline';


  user: any;

  constructor(public service: GitHubService, public app: AppService) {
    this.service.init();
  }


  ngOnInit(): void {
    this.app.run(async () => {
      await this.service.getAccessTokenAsync();
    });
  }


}
