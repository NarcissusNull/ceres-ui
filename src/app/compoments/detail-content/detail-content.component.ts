import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import Goods from 'src/app/domain/goods.domin';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.css']
})
export class DetailContentComponent implements OnInit {

  @Input() good!: Goods;

  imgs!: string[];

  constructor() { }

  ngOnInit(): void {
    this.imgs = _.split(this.good.describe, ',')
    console.log(this.imgs)
  }

}
