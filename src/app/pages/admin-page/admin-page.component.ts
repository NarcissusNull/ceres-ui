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

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  constructor(private fb: FormBuilder, private httpService: HttpService, private http: HttpClient) {}
  list!: Goods[];
  isChangeVisible = false;

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
    this.httpService.allGoods().subscribe(
      data => {
        this.list = data
        this.initLoading = false
      }
    )
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

  initLoading = true;
  loadingMore = false;
  data: any[] = [];

  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }

  edit(item: Goods): void {
    this.changedGoods = item
    this.isChangeVisible = true
  }

  deleted(item: Goods) {
    this.http.get('/api/goods/delete/' + item.id).subscribe(data => {
      alert('删除成功!')
      location.reload()
    })
  }
}
const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';