import {Injectable} from '@angular/core';
import {AuthConfig} from 'angular-oauth2-oidc';






export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://github.com/login/oauth/authorize',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'a9139d0c87c6868e0554',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: null,
}



@Injectable({
  providedIn: 'root'
})
export class GitHubService {


  client_id = 'a9139d0c87c6868e0554';

  constructor() {
  }


  login() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + encodeURI(this.client_id);
  }

}
