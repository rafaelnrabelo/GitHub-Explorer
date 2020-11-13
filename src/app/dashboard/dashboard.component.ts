import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { APIService } from '../services/api.service';

interface Repo {
  id: string;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface SearchData {
  repositoryName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  repos: Repo[] = [];
  searchForm: FormGroup;
  inputError: string = '';

  constructor(private api: APIService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      repositoryName: '',
    });
  }

  ngOnInit() {
    const storagedRepos = localStorage.getItem('@GitHubExplorer/repos');
    if (storagedRepos) {
      this.repos = JSON.parse(storagedRepos);
    }
  }

  async onSubmit(searchData: SearchData) {
    this.searchForm.reset();

    if (!searchData.repositoryName) {
      this.inputError = 'Digite autor/nome do repositório.';
    } else {
      try {
        this.inputError = '';
        const newRepo = await this.api.getRepo(searchData.repositoryName);

        if (!this.repos.find((repo) => repo.id === newRepo.id)) {
          this.repos.push(newRepo);
          localStorage.setItem(
            '@GitHubExplorer/repos',
            JSON.stringify(this.repos)
          );
        }
      } catch (error) {
        this.inputError =
          'Erro ao adicionar repositório, digite autor/nome do repositório.';
      }
    }
  }
}
