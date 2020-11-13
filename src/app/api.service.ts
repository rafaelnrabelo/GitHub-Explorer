import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Repo {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getRepos(profile: string) {
    const response = this.http
      .get<Repo[]>(`https://api.github.com/users/${profile}/repos`)
      .pipe();
    return response;
  }
}
