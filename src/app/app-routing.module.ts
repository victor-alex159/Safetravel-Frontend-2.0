import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'log', loadChildren: () => import('./Pages/login/login.module').then(m => m.LoginModule) },
  { path: 'us', loadChildren: () => import('./Pages/user/user.module').then(m => m.UserModule) },
  { path: 'pr', loadChildren: () => import('./Pages/product/product.module').then(m => m.ProductModule) },
  { path: 'home', loadChildren: () => import('./Pages/home/home.module').then(m=> m.HomeModule) },
  { path: 'org', loadChildren: () => import('./Pages/organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'about', loadChildren: () => import('./Pages/about/about.module').then(m => m.AboutModule) },
  { path: 'contact', loadChildren: () => import('./Pages/contact/contact.module').then(m => m.ContactModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
