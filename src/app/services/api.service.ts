import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  async getRepo(repositoryName: string) {
    const response = await this.http
      .get<Repo>(`https://api.github.com/repos/${repositoryName}`)
      .toPromise();
    return response;
  }

  async getIssues(repositoryName: string) {
    const response = await this.http
      .get<Issue[]>(`https://api.github.com/repos/${repositoryName}/issues`)
      .toPromise();
    return response;
  }
}
