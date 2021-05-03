import { Component, OnInit } from '@angular/core';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-related-product-list',
  templateUrl: './related-product-list.component.html',
  styleUrls: ['./related-product-list.component.css']
})
export class RelatedProductListComponent implements OnInit {

  goods!: Goods[];
  constructor(private httpServie: HttpService) {
    this.httpServie.queryGoods(10).subscribe(
      data => this.goods = data
    )
   }

  ngOnInit(): void {
    // this.httpServie.queryGoods(10).subscribe(
    //   data => this.goods = data
    // )
  }

}
