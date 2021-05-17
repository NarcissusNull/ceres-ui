import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Goods from 'src/app/domain/goods.domain';
import Type from 'src/app/domain/type.domain';
import { HttpService } from 'src/app/service/http.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
})
export class RecommendComponent implements OnInit {
  types: Type[] = [];
  array: Goods[] = [];
  side: Goods[] = [];
  constructor(private httpService: HttpService, private route: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.httpService.queryTypes().subscribe((data) => (this.types = data));
    this.httpService.queryGoods(4).subscribe((data) => (this.array = data));

    this.httpService.queryGoods(3).subscribe((data) => (this.side = data));
  }

  openType(id: number) {
    this.searchService.setTypeValue(id);
    this.route.navigateByUrl('/type/' + id)
  }
}
