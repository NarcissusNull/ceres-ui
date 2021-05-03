import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Goods from '../domain/goods.domain';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  setValue(value: string) {
    this.value = value
  }
  value!: string
  constructor(private httpClient: HttpClient) {}
  getRecommand(): string {
    return 'search';
  }

  getValue() {
    return this.value
  }

  search(): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>('/api/goods/search/' + this.value);
  }
}
