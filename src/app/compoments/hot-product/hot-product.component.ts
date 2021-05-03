import { Component, OnInit } from '@angular/core';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
  styleUrls: ['./hot-product.component.css']
})
export class HotProductComponent implements OnInit {
  goods: Goods[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.queryGoods(5).subscribe(
      data => this.goods = data
    )
  }

}
