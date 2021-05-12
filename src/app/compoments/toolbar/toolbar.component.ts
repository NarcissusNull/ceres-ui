import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/domain/user.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  visible = false;
  user!: User;
  isUserInfoVisible = false;

  constructor(private httpService: HttpService, private route: Router) {}

  ngOnInit(): void {}
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  handleCancel() {
    this.isUserInfoVisible = false;
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
    alert('用户退出成功！')
    this.isUserInfoVisible = false;
  }
}
