import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOrganizationComponent } from './form-organization/form-organization.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';

const routes: Routes = [
  { path: 'list', component: OrganizationListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
