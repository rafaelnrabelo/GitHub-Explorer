import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { APIService } from '../services/api.service';

interface Repo {
  id: string;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  id: string;
  title: string;
  user: {
    login: string;
  };
  html_url: string;
}

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
})
export class RepositoryComponent implements OnInit {
  repo: Repo = {
    id: '',
    full_name: '',
    description: '',
    owner: {
      avatar_url: '',
      login: '',
    },
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
  };

  issues: Issue[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: APIService
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (data) => {
      const responses = await Promise.all([
        this.api.getRepo(data.full_name),
        this.api.getIssues(data.full_name),
      ]);

      this.repo = responses[0];
      this.issues = responses[1];
    });
  }
}
