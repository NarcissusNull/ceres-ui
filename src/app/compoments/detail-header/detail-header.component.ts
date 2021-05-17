import { Component, Input, OnInit } from '@angular/core';
import Goods from 'src/app/domain/goods.domain';
import User from 'src/app/domain/user.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css'],
})
export class DetailHeaderComponent implements OnInit {
  @Input() good!: Goods;
  isVisible = false;
  user!: User;
  switchValue = false;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.queryUser(Number(localStorage.getItem('userId'))).subscribe(
      data => this.user = data
    )
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
}
