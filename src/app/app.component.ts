import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { APIService } from './api.service';

interface Repo {
  name: string;
  owner: {
    login: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  repos: Observable<Repo[]> | undefined;

  constructor(private api: APIService) {}

  async ngOnInit() {
    this.repos = this.api.getRepos();
  }
}
