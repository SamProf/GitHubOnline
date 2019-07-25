import {Injectable} from '@angular/core';
import {AuthConfig} from 'angular-oauth2-oidc';
import {getRandomInt} from '../helpers/math';
import {HttpClient} from '@angular/common/http';
import {AccessToken} from './contract/access-token';
import {LogService} from './log.service';
import {User} from './contract/user';
import {Repo} from './contract/repo';


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

  // token: AccessToken;

  constructor(private http: HttpClient, private log: LogService) {
  }


  access_token(): Promise<AccessToken> {

    var token = JSON.parse(localStorage.getItem('gitHub_token'));
    if (token) {
      return Promise.resolve(token);
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
          // this.token = d;
          localStorage.setItem('gitHub_token', JSON.stringify(d));
          return d;
        })
        .catch((e) => {
          this.log.error(e, 'Login error');
          throw  e;
        });
    } else {
      return Promise.reject(new Error('Code is empty'));
    }
  }

  user(token: AccessToken): Promise<User> {
    return this.http.get<User>('https://api.github.com/user',
      {
        // withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'token ' + token.access_token

        }
      }).toPromise();
  }

  user_repos(token: AccessToken): Promise<Repo[]> {
    return this.http.get<Repo[]>('https://api.github.com/user/repos',
      {
        // withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'token ' + token.access_token

        }
      }).toPromise();
  }

  repo(token: AccessToken, user: string, repo: string): Promise<Repo> {
    return this.http.get<Repo>('https://api.github.com/repos/' + user + '/' + repo,
      {
        // withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'token ' + token.access_token

        }
      }).toPromise();
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
