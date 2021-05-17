import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { TypePageComponent } from './pages/type-page/type-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'search/:value', component: SearchPageComponent },
  { path: 'type/:value', component: TypePageComponent},
  { path: 'detail/:id', component: ProductDetailPageComponent},
  { path: 'admin', component: AdminPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SignUpPageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
