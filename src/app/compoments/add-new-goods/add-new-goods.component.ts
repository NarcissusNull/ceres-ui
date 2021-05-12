import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import * as _ from 'lodash';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import Type from 'src/app/domain/type.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-new-goods',
  templateUrl: './add-new-goods.component.html',
  styleUrls: ['./add-new-goods.component.css'],
})
export class AddNewGoodsComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  types: Type[] = [];

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });

    this.httpService.queryTypes().subscribe((data) => {
      this.types = data;
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let fileNames = _.chain(this.fileList)
      .filter((file) => file.status === 'done')
      .map((file) => file.name)
      .value();

    this.httpService
      .createGoods({
        ...this.validateForm.value,
        images: fileNames,
      })
      .subscribe((data) => {
        alert('新增商品成功')
        location.reload();
      });
  }

  fileList: NzUploadFile[] = [];

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
