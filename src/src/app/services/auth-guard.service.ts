import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GitHubService} from './git-hub.service';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private service: GitHubService, private app: AppService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // debugger;

    try {
      if (this.app.token)
      {
        return true;
      }
      var token = await this.service.access_token();
      this.app.token = token;
      var user = await this.service.user(token);
      this.app.user = user;
      return true;
    }
    catch (e) {
      this.router.navigate(['/info']);
      return false;
    }
  }
}
