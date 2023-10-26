import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutConfirmationModalPage } from './logout-confirmation-modal.page';

describe('LogoutConfirmationModalPage', () => {
  let component: LogoutConfirmationModalPage;
  let fixture: ComponentFixture<LogoutConfirmationModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogoutConfirmationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
