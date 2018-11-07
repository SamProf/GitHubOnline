import {Injectable} from '@angular/core';
import {LogService} from './log.service';
import {AccessToken} from './contract/access-token';
import {User} from './contract/user';
import {Repo} from './contract/repo';
import {GitHubService} from './git-hub.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  loading: boolean = false;

  user: User;
  token: AccessToken;

  repos: Repo[];
  repo: Repo;


  async loadRepos() {
    this.repos = await this.service.user_repos(this.token);
  }

  constructor(private log: LogService, private service: GitHubService) {
  }


  run(func: () => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loading = true;
        func()
          .then((d) => {
            resolve(d);
          })
          .catch((e) => {
            this.log.error(e, 'run');
            reject(e);
          })
          .then(() => {
            this.loading = false;
          });
      });
    });


  }
}
