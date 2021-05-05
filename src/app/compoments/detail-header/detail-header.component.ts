import { Component, Input, OnInit } from '@angular/core';
import Goods from 'src/app/domain/goods.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.css'],
})
export class DetailHeaderComponent implements OnInit {
  @Input() good!: Goods;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  onBuy() {
    let goods: Goods[] = [];
    goods.push(this.good);
    alert(goods);
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
}
