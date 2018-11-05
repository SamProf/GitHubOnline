import {Component, OnInit} from '@angular/core';
import {GitHubService} from '../../services/git-hub.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private service: GitHubService) {
  }

  ngOnInit() {
  }

  test() {
    this.service.login();

  }


}
