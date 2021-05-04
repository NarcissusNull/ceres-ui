import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {}
  validateForm!: FormGroup;

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm.value);

    this.httpService
      .signup(
        this.validateForm.value['userName'],
        this.validateForm.value['password']
      )
      .subscribe((data) => {
        if (data.id) {
          this.router.navigateByUrl('/login');
        } else {
          alert('注册用户已存在！');
        }
      });
  }
}
