import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'repository/:full_name', component: RepositoryComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
