import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit {
  good!: Goods;
  id!: number;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.httpService
      .queryGoodsDetail(this.id)
      .subscribe((data) => (this.good = data));
  }

  ngOnInit(): void {

  }
}
