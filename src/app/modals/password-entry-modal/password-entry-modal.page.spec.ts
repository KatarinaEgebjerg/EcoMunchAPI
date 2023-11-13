import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordEntryModalPage } from './password-entry-modal.page';

describe('PasswordEntryModalPage', () => {
  let component: PasswordEntryModalPage;
  let fixture: ComponentFixture<PasswordEntryModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasswordEntryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
