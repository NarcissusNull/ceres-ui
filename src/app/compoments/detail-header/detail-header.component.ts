import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import Goods from 'src/app/domain/goods.domain';
import Type from 'src/app/domain/type.domain';
import User from 'src/app/domain/user.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css'],
})
export class DetailHeaderComponent implements OnInit, OnChanges{
  @Input() good!: Goods;
  isVisible = false;
  user!: User;
  switchValue = false;
  types: Type[] = [];
  typename!: string;

  constructor(private httpService: HttpService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.httpService.queryTypes().subscribe((data) => {
      this.types = data;
      this.typename = this.queryType(this.good.type)
    })
  }

  ngOnInit(): void {
    this.httpService.queryUser(Number(localStorage.getItem('userId'))).subscribe(
      data => this.user = data
    )

    this.httpService.queryTypes().subscribe((data) => {
      this.types = data;
      this.typename = this.queryType(this.good.type)
    })
  }

  onBuy() {
    let goods: Goods[] = [];
    goods.push(this.good);
    this.httpService.createOrder(goods).subscribe((data) => {
      if (data.id) {
        alert('购买成功！');
      }
    });
  }

  onCart() {
    this.httpService
      .createCart(this.good.id, Number(localStorage.getItem('userId')))
      .subscribe((data) => {
        alert('添加购物车成功');
        location.reload();
      });
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
    this.onBuy();
  }

  onPayment() {
    this.isVisible = true;
  }

  queryType(id: number): string {
    return _.chain(this.types)
      .filter((user) => user.id === id)
      .value()[0].name;
  }
}
