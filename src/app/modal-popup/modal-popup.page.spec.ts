import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPopupPage } from './modal-popup.page';

describe('ModalPopupPage', () => {
  let component: ModalPopupPage;
  let fixture: ComponentFixture<ModalPopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
