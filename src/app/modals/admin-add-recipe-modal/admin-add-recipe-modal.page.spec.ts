import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddRecipeModalPage } from './admin-add-recipe-modal.page';

describe('AdminAddRecipeModalPage', () => {
  let component: AdminAddRecipeModalPage;
  let fixture: ComponentFixture<AdminAddRecipeModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminAddRecipeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
