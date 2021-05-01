import { Component, OnInit } from '@angular/core';
import Goods from 'src/app/domain/goods.domin';
import Type from 'src/app/domain/type.domin';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  types: Type[] = []
  array: Goods[] = [];
  side: Goods[] = [];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.queryTypes().subscribe(
      data => this.types = data
    )
    this.httpService.queryGoods(4).subscribe(
      data => this.array = data
    )

    this.httpService.queryGoods(3).subscribe(
      data => this.side = data
    )
  }

}
