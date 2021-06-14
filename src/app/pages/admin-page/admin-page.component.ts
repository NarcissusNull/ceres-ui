import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import Goods from 'src/app/domain/goods.domain';
import Type from 'src/app/domain/type.domain';
import OrderDto from 'src/app/domain/order.domain';
import User from 'src/app/domain/user.domain';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  constructor(
    private fb: FormBuilder,
    public httpService: HttpService,
    private http: HttpClient
  ) {}
  list!: Goods[];
  isChangeVisible = false;
  orderList!: OrderDto[];
  OldOrderList!: OrderDto[]
  isNewOrderVisible = false;
  isOldOrderVisible = false;

  AllUser!: User[];
  AllGoods!: Goods[];

  changedGoods!: Goods;

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`,
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let types: String[] = _.values(this.validateForm.value);

    this.httpService.createTypes(types);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
    this.httpService.allGoods().subscribe((data) => {
      this.list = data;
      this.initLoading = false;
    });

    this.httpService.notice().subscribe((data) => (this.orderList = data));
    this.httpService.oldOrders().subscribe((data) => (this.OldOrderList = data));
    this.httpService
      .allGoodsWithDeleted()
      .subscribe((data) => (this.AllGoods = data));
    this.httpService.allUser().subscribe((data) => (this.AllUser = data));
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showNewOrderModal() {
    this.isNewOrderVisible = true;
  }
  showOldOrderModal() {
    this.isOldOrderVisible = true;
  }

  handleNewOrderCancel() {
    this.isNewOrderVisible = false;
  }
  handleOldOrderCancel() {
    this.isOldOrderVisible = false;
  }

  initLoading = true;
  loadingMore = false;
  data: any[] = [];

  edit(item: Goods): void {
    this.changedGoods = item;
    this.isChangeVisible = true;
  }

  deleted(item: Goods) {
    this.http.get('/api/goods/delete/' + item.id).subscribe((data) => {
      alert('删除成功!');
      location.reload();
    });
  }

  handleNewOrderOk() {
    this.http
      .get('/api/admin/notice/clear/' + localStorage.getItem('userId'))
      .subscribe((data) => {
        alert('发货成功！');
        location.reload();
      });
  }

  queryUserName(id: number): string {
    return _.chain(this.AllUser)
      .filter((user) => user.id === id)
      .value()[0].name;
  }

  queryGoods(id: number[], nums: number[]): string[] {
    let e = _.chain(this.AllGoods)
      .filter((goods) => id.indexOf(goods.id) != -1)
      .map((goods) => goods.name)
      .value();
      for(let i = 0; i < e.length; i++) {
        e[i] = e[i] + ' × ' + nums[i]
      }
      return e;
  }

  queryPrice(id: number[]): number {
    return _.chain(this.AllGoods)
      .filter((goods) => id.indexOf(goods.id) != -1)
      .reduce((prev, curr, index, list) => prev + curr.price * curr.rate, 0)
      .value();
  }
}
