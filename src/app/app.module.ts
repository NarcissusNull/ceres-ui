import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AntdModule } from '../antd.module';
import { ToolbarComponent } from './compoments/toolbar/toolbar.component';
import { SearchComponent } from './compoments/search/search.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RecommendComponent } from './compoments/recommend/recommend.component';
import { HotProductComponent } from './compoments/hot-product/hot-product.component';
import { RelatedProductListComponent } from './compoments/related-product-list/related-product-list.component';
import { ProductListComponent } from './compoments/product-list/product-list.component';
import { ShoppingCartComponent } from './compoments/shopping-cart/shopping-cart.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { DetailHeaderComponent } from './compoments/detail-header/detail-header.component';
import { DetailContentComponent } from './compoments/detail-content/detail-content.component';
import { AddNewGoodsComponent } from './compoments/add-new-goods/add-new-goods.component';
import { OrderConfirmComponent } from './compoments/order-confirm/order-confirm.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { ChangeProductComponent } from './compoments/change-product/change-product.component';
import { TypePageComponent } from './pages/type-page/type-page.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SearchComponent,
    HomePageComponent,
    SearchPageComponent,
    LoginPageComponent,
    UserPageComponent,
    AdminPageComponent,
    RecommendComponent,
    HotProductComponent,
    RelatedProductListComponent,
    ProductListComponent,
    ShoppingCartComponent,
    ProductDetailPageComponent,
    DetailHeaderComponent,
    DetailContentComponent,
    AddNewGoodsComponent,
    OrderConfirmComponent,
    SignUpPageComponent,
    ChangeProductComponent,
    TypePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
