import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Repo {
  name: string;
  owner: {
    login: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getRepos() {
    const response = this.http
      .get<Repo[]>('https://api.github.com/users/rafaelnrabelo/repos')
      .pipe();
    return response;
  }
}
