import {Component, OnInit} from '@angular/core';
import {GitHubService} from '../../services/git-hub.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public service: GitHubService) {
  }

  ngOnInit() {
  }



}
