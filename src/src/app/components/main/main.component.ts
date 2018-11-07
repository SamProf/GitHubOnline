import {Component, OnInit} from '@angular/core';
import {GitHubService} from '../../services/git-hub.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {AppService} from '../../services/app.service';
import {Repo} from '../../services/contract/repo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(public service: GitHubService, public app: AppService) {
  }

  ngOnInit() {
    this.app.loadRepos();
  }


}
