import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserModalPage } from './update-user-modal.page';

describe('UpdateUserModalPage', () => {
  let component: UpdateUserModalPage;
  let fixture: ComponentFixture<UpdateUserModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateUserModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
