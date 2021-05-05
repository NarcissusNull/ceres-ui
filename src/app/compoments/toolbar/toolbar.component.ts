import { Component, OnInit } from '@angular/core';
import User from 'src/app/domain/user.domain';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  visible = false;
  user!: User;
  isUserInfoVisible = false;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  handleCancel() {
    this.isUserInfoVisible = false;
  }

  openUserInfo() {
   this.httpService.queryUser(Number(localStorage.getItem('userId'))).subscribe(
     data => {
       this.user = data
       this.isUserInfoVisible = true
     }
   )
  }
}
