import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { APIService } from './api.service';

interface Repo {
  name: string;
  description: string;
}

interface SearchData {
  profile: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  repos: Observable<Repo[]> | undefined;
  searchForm: FormGroup;

  constructor(private api: APIService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      profile: '',
    });
  }

  onSubmit(searchData: SearchData) {
    this.repos = this.api.getRepos(searchData.profile);
  }
}
