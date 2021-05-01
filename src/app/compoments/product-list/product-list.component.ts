import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import Goods from 'src/app/domain/goods.domin';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input()
  goods!: Goods[];
  
  g: Goods[][] = []
  constructor() { }

  ngOnInit(): void {
    this.g = _.chunk(this.goods, 5)
  }

}
