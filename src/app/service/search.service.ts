import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  getRecommand(): string {
    return "search"
  }
}
