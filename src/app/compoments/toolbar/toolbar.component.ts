import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Goods from 'src/app/domain/goods.domain';
import OrderDto from 'src/app/domain/order.domain';
import User from 'src/app/domain/user.domain';
import { HttpService } from 'src/app/service/http.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  visible = false;
  user!: User;
  isUserInfoVisible = false;
  isAdmin = false;
  isMapVisible = false;
  isOldOrderVisible = false;
  OldOrderList!: OrderDto[];
  AllUser!: User[];
  AllGoods!: Goods[];

  constructor(private httpService: HttpService, private route: Router) {}

  ngOnInit(): void {
    this.httpService
      .queryUser(Number(localStorage.getItem('userId')))
      .subscribe((data) => (this.isAdmin = data.role === 'admin'));
    this.httpService.MyOrders().subscribe((data) => (this.OldOrderList = data));
    this.httpService
      .allGoodsWithDeleted()
      .subscribe((data) => (this.AllGoods = data));
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  handleCancel() {
    this.isUserInfoVisible = false;
  }

  openUserInfo(): void {
    const userID = localStorage.getItem('userId');
    if (userID !== null) {
      this.httpService.queryUser(Number(userID)).subscribe((data) => {
        this.user = data;
        this.isUserInfoVisible = true;
      });
    } else {
      this.route.navigateByUrl('/login');
    }
  }
  onLogout() {
    localStorage.clear();
    alert('用户退出成功！');
    this.isUserInfoVisible = false;
  }

  openAdmin() {
    this.route.navigateByUrl('/admin');
  }

  openMap() {
    this.isMapVisible = true;
  }

  handleMapCancel() {
    this.isMapVisible = false;
  }

  showOldOrderModal() {
    this.isOldOrderVisible = true;
  }
  handleOldOrderCancel() {
    this.isOldOrderVisible = false;
  }

  queryGoods(id: number[]): string[] {
    return _.chain(this.AllGoods)
      .filter((goods) => id.indexOf(goods.id) != -1)
      .map((goods) => goods.name)
      .value();
  }

  queryPrice(id: number[]): number {
    return _.chain(this.AllGoods)
      .filter((goods) => id.indexOf(goods.id) != -1)
      .reduce((prev, curr, index, list) => prev + curr.price * curr.rate, 0)
      .value();
  }
}
