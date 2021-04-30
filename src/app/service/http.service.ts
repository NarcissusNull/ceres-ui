import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  queryImage(img: String) {
    return this.httpClient.get("http://localhost:8080/img/" + img).subscribe()
  }
}
