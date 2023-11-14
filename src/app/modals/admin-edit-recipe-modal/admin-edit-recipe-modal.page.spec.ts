import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEditRecipeModalPage } from './admin-edit-recipe-modal.page';

describe('AdminEditRecipeModalPage', () => {
  let component: AdminEditRecipeModalPage;
  let fixture: ComponentFixture<AdminEditRecipeModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminEditRecipeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
