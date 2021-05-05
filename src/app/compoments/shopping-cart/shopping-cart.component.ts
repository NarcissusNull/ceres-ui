import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';
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

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private httpService: HttpService
  ) {}

  data: Goods[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  percent = 0;

  ngOnInit(): void {
    this.loadData(1);
  }

  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }

  onClose(): void {
    this.close.emit();
  }

  loadData(pi: number): void {
    this.http
      .get<Goods[]>('/api/goods/cart/search/' + localStorage.getItem('userId'))
      .subscribe((data) => (this.data = data));
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
}
