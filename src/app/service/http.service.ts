import { HttpClient } from '@angular/common/http';
import { Injectable, ɵEMPTY_MAP } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import Goods from '../domain/goods.domain';
import OrderDto from '../domain/order.domain';
import orderDto from '../domain/order.domain';
import Type from '../domain/type.domain';
import User from '../domain/user.domain';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  MyOrders(): Observable<OrderDto[]> {
    return this.httpClient.get<OrderDto[]>(
      '/api/admin/notice/my/order/list/' + localStorage.getItem('userId')
    );
  }
  notice(): Observable<OrderDto[]> {
    return this.httpClient.get<OrderDto[]>(
      '/api/admin/notice/list/' + localStorage.getItem('userId')
    );
  }

  oldOrders(): Observable<OrderDto[]> {
    return this.httpClient.get<OrderDto[]>(
      '/api/admin/notice/old/order/list/' + localStorage.getItem('userId')
    );
  }

  createCart(id: number, user: number) {
    return this.httpClient.get('/api/goods/cart/' + id + '/' + user);
  }

  changeGoods(goods: any) {
    return this.httpClient.post('/api/goods/update/', goods);
  }
  queryUser(id: number): Observable<User> {
    return this.httpClient.get<User>('api/user/' + id);
  }
  createOrder(goods: Goods[]) {
    let user = Number(localStorage.getItem('userId'));
    let goodsIds = _.map(goods, (goods) => goods.id);
    return this.httpClient.post<orderDto>('/api/order/create', {
      user: user,
      goods: goodsIds,
    });
  }

  constructor(private httpClient: HttpClient) {}

  queryImage(img: String) {}

  createTypes(types: String[]) {
    this.httpClient.post('/api/admin/types', types).subscribe();
    alert('创建新分类成功');
  }

  queryTypes(): Observable<Type[]> {
    return this.httpClient.get<Type[]>('/api/goods/types');
  }

  createGoods(goods: any) {
    return this.httpClient.post('/api/goods/create', goods);
  }

  queryGoods(size: number): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>('/api/goods/' + size);
  }

  queryGoodsDetail(id: number): Observable<Goods> {
    return this.httpClient.get<Goods>('/api/goods/detail/' + id);
  }

  login(name: string, password: string): Observable<User> {
    return this.httpClient.post<User>('/api/user/login', {
      name: name,
      password: password,
    });
  }

  signup(name: string, password: string, address: string): Observable<User> {
    return this.httpClient.post<User>('/api/user/signup', {
      name: name,
      password: password,
      address: address,
    });
  }

  search(value: string): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>('/api/goods/search/' + value);
  }

  allGoods(): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>('/api/goods/search');
  }

  allGoodsWithDeleted(): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>('/api/goods/search/all');
  }

  allUser(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/user/all');
  }

  queryGoodsDetailForIds(ids: number[]): Observable<string[]> {
    return this.httpClient.post<string[]>('/api/goods/queryNames', ids);
  }

  queryGoodsTotalPrice(ids: number[]): Observable<number> {
    return this.httpClient.post<number>('/api/goods/total', ids);
  }
}
