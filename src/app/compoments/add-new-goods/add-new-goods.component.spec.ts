import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGoodsComponent } from './add-new-goods.component';

describe('AddNewGoodsComponent', () => {
  let component: AddNewGoodsComponent;
  let fixture: ComponentFixture<AddNewGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
