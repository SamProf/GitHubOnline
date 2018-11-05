import {Injectable} from '@angular/core';
import {AuthConfig} from 'angular-oauth2-oidc';
import {getRandomInt} from '../helpers/math';
import {HttpClient} from '@angular/common/http';
import {AccessToken} from './contract/access-token';
import {LogService} from './log.service';


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
};


@Injectable({
  providedIn: 'root'
})
export class GitHubService {


  client_id: string = 'a9139d0c87c6868e0554';
  state: string;
  code: string;
  token: AccessToken;

  constructor(private http: HttpClient, private log: LogService) {
  }


  getAccessTokenAsync(): Promise<AccessToken> {

    this.token = JSON.parse(localStorage.getItem('gitHub_token'));
    if (this.token) {
      return Promise.resolve(this.token);
    }

    if (this.code) {
      return this.http.post<AccessToken>('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
        'client_id=' + encodeURIComponent(this.client_id)
        + '&client_secret=' + encodeURIComponent('bc4cb39ccfc9462b14727235bb019ea776c7526e')
        + '&code=' + encodeURIComponent(this.code)
        + '&state=' + encodeURIComponent(this.state)
        , {
          // withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .toPromise()
        .then((d) => {
          this.log.debug('Login success');
          this.token = d;
          localStorage.setItem('gitHub_token', JSON.stringify(d));
          return d;
        })
        .catch((e) => {
          this.log.error(e, 'Login error');
          throw  e;
        });
    }
    else {
      return Promise.reject(new Error('Code is empty'));
    }
  }


  init() {
    this.code = this.getQueryVariable('code');
    this.state = this.getQueryVariable('state') || getRandomInt(0, 99999).toString();
  }


  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    // console.log('Query variable %s not found', variable);
  }


  login() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + encodeURI(this.client_id) + '&state=' + encodeURI(this.state);
  }

}
