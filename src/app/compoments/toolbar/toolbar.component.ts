import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  visible = false;

  constructor() { }

  ngOnInit(): void {
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
