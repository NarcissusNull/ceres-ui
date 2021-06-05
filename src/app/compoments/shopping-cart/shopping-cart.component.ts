import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';
import * as _ from 'lodash';
import User from 'src/app/domain/user.domain';
const count = 5;
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  @Input()
  visible!: boolean;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  total = 0;
  switchValue = false;
  isPaymentVisible = false;

  user!: User;

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private httpService: HttpService
  ) {}

  data: Goods[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  percent: any[] = [];

  ngOnInit(): void {
    this.loadData();
    this.httpService
      .queryUser(Number(localStorage.getItem('userId')))
      .subscribe((data) => {
        this.user = data;

      });
  }

  increase(index: any): void {
    console.log(index)
    console.log(this.percent[index])
    this.percent[index].percent = this.percent[index].percent + 1;
    if (this.percent[index].percent > 100) {
      this.percent[index].percent = 100;
    }
    let price = 0;
    _.forEach(this.percent, (g) => (price += g.price * g.rate * g.percent));
    this.total = price
  }

  decline(index: any): void {
    this.percent[index].percent = this.percent[index].percent - 1;
    if (this.percent[index].percent < 1) {
      this.percent[index].percent = 1;
    }
    let price = 0;
    _.forEach(this.percent, (g) => (price += g.price * g.rate * g.percent));
    this.total = price
  }

  getPr(index: number) {
    return this.percent[index];
  }

  onClose(): void {
    this.close.emit();
  }

  loadData(): void {
    this.http
      .get<Goods[]>('/api/goods/cart/search/' + localStorage.getItem('userId'))
      .subscribe((data) => {
        this.data = data;
;
        this.percent = _.map(this.data, (d) => {
          return { ...d, percent: 1 };
        });
        let price = 0;
        _.forEach(this.percent, (g) => (price += g.price * g.rate * g.percent));
        this.total = price
      });
  }

  onBuy() {
    this.httpService.createOrder(this.data).subscribe((data) => {
      if (data.id) {
        alert('购买成功！');
      }
    });

    this.http
      .get('/api/goods/cart/clear/' + localStorage.getItem('userId'))
      .subscribe((data) => location.reload());
  }

  removeCart(id: number) {
    this.http
      .get('api/goods/cart/remove/' + localStorage.getItem('userId') + '/' + id)
      .subscribe((data) => {
        alert('删除成功');
        location.reload();
      });
  }

  handleCancel() {
    this.isPaymentVisible = false;
  }

  handleOk() {
    this.isPaymentVisible = false;
    this.onBuy();
  }

  onPayment() {
    this.isPaymentVisible = true;
  }
}
