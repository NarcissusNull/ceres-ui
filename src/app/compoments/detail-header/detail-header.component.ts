import { Component, Input, OnInit } from '@angular/core';
import Goods from 'src/app/domain/goods.domin';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css']
})
export class DetailHeaderComponent implements OnInit {

  @Input() good!: Goods;

  constructor() { }

  ngOnInit(): void {
  }

}
