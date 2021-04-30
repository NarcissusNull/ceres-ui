import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Type from '../domain/type.domin';

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
    return this.httpClient.post('/api/goods/create', goods)
  }
}
