import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Goods from 'src/app/domain/goods.domain';
import OrderDto from 'src/app/domain/order.domain';
import User from 'src/app/domain/user.domain';
import { HttpService } from 'src/app/service/http.service';
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  isChangeUserInfoVisible = false;
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.httpService
      .queryUser(Number(localStorage.getItem('userId')))
      .subscribe((data) => (this.isAdmin = data.role === 'admin'));
    this.httpService.MyOrders().subscribe((data) => (this.OldOrderList = data));
    this.httpService
      .allGoodsWithDeleted()
      .subscribe((data) => (this.AllGoods = data));

    this.validateForm = this.fb.group({
      name: [null],
      password: [null],
      address: [null],
    });
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
  handleChangeUserInfoCancel() {
    this.isChangeUserInfoVisible = false;
  }

  showChangeUserInfoModal() {
    this.isChangeUserInfoVisible = true;
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
    alert('?????????????????????');
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

  queryGoods(id: number[], nums: number[]): string[] {
    let e = _.chain(this.AllGoods)
      .filter((goods) => id.indexOf(goods.id) != -1)
      .map((goods) => goods.name)
      .value();
      for(let i = 0; i < e.length; i++) {
        e[i] = e[i] + ' ?? ' + nums[i]
      }
      return e;
  }

  queryPrice(id: number[]): number {
    return _.chain(this.AllGoods)
      .filter((goods) => id.indexOf(goods.id) != -1)
      .reduce((prev, curr, index, list) => prev + curr.price * curr.rate, 0)
      .value();
  }

  changeUserInfo() {
    console.log(this.validateForm.value);
    this.httpService
      .changeUserInfo({
        ...this.validateForm.value,
        id: this.user.id,
      })
      .subscribe((data) => {
        alert("????????????????????????????????????????????????")
        this.onLogout();
        this.route.navigateByUrl('/login');
      });
  }
}
