import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  validateForm!: FormGroup;
  title: string = '用户登录';
  userVisible = true;
  adminVisible = false;


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm.value);

    this.httpService
      .login(
        this.validateForm.value['userName'],
        this.validateForm.value['password']
      )
      .subscribe((data) => {
        if (data.id) {
          localStorage.setItem('userId', data.id.toString());
          this.router.navigateByUrl('/home');
        } else {
          alert('用户名或者密码错误！');
        }
      });
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  onChange() {
    this.adminVisible = !this.adminVisible;
    this.userVisible = !this.userVisible;
  }
}
