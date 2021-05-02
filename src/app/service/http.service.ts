import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Goods from '../domain/goods.domin';
import Type from '../domain/type.domin';
import User from '../domain/user.domin';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  queryImage(img: String) {}

  createTypes(types: String[]) {
    this.httpClient.post('/api/admin/types', types).subscribe();
  }

  queryTypes(): Observable<Type[]> {
    return this.httpClient.get<Type[]>('/api/goods/types');
  }

  createGoods(goods: any) {
    return this.httpClient.post('/api/goods/create', goods);
  }

  queryGoods(size: number): Observable<Goods[]> {
      return this.httpClient.get<Goods[]>('/api/goods/' + size)
  }

  queryGoodsDetail(id: number): Observable<Goods> {
    return this.httpClient.get<Goods>('/api/goods/detail/' + id)
  }

  login(name: string, password: string): Observable<User> {
    return this.httpClient.post<User>('/api/user/login', {"name": name, "password": password})
  }

  search(value: string): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>('/api/goods/search/' + value)
  }
}
