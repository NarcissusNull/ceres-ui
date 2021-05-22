import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Goods from 'src/app/domain/goods.domain';
import Type from 'src/app/domain/type.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrls: ['./change-product.component.css']
})
export class ChangeProductComponent implements OnInit {
  @Input()
  isVisible: boolean = false;
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  types: Type[] = [];

  @Input() 
  goods!: Goods;

  constructor(private fb: FormBuilder, private httpService: HttpService, private http: HttpClient) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null],
      price: [null],
      type: [null],
      rate: [null]
    });

    this.httpService.queryTypes().subscribe((data) => {
      this.types = data;
    })
  }

  handleChangeCancel() {
    location.reload()
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    if(this.validateForm.valid){
      this.httpService
      .changeGoods({
        ...this.validateForm.value,
        id: this.goods.id
      })
      .subscribe((data) => {
        alert('修改商品成功')
        location.reload();
      });
    }

  } 
}
