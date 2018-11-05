import {Component, OnInit} from '@angular/core';
import {GitHubService} from '../../services/git-hub.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get name() {
    let claims: any = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims.given_name;
  }


}
