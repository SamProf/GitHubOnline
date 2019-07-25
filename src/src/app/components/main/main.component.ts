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


  _text: string;

  get text(): string {
    return this._text;
  }

  set text(v: string) {
    this._text = v;
    localStorage.setItem(textKey, v);
  }

  ngOnInit() {
    // this.app.loadRepos();
    this._text = localStorage.getItem(textKey);
    // this.parseStars();
  }


  async parseStars() {

    var lines = this.text;

    var regex = /\[(?<text>.+?)\]\((?<url>\S+?)\)(\s*)(\(.*?:star:.*?\))?/g;


    var myArray;
    while ((myArray = regex.exec(lines)) !== null) {

      // var i = myArray.index + myArray[0].length;
      var url = myArray.groups.url;
      var urlRegex = /^https:\/\/github.com\/(?<user>[^/]+?)\/(?<repo>[^/^\s]+)$/g;


      // if (myArray.groups.text == "Gitter")
      // {
      //   debugger;
      // }

      let m = urlRegex.exec(url);
      if (m) {
        // debugger;
        console.log(myArray[0]);
        console.log(m);
        var data = await this.service.repo(this.app.token, m.groups.user, m.groups.repo);

        lines = `${lines.substring(0, myArray.index)}[${myArray.groups.text}](${myArray.groups.url}) (${data.stargazers_count}:star:) ${lines.substring(myArray.index + myArray[0].length)}`;
        this.text = lines;
      }
    }

    // debugger;
  }
}


export const textKey = 'main-text';
