import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUpdateRecipeModalPage } from './admin-update-recipe-modal.page';

describe('AdminUpdateRecipeModalPage', () => {
  let component: AdminUpdateRecipeModalPage;
  let fixture: ComponentFixture<AdminUpdateRecipeModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminUpdateRecipeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
