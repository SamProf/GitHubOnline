import {Injectable} from '@angular/core';

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
