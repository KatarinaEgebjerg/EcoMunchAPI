import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCreateRecipeModalPage } from './admin-create-recipe-modal.page';

describe('AdminCreateRecipeModalPage', () => {
  let component: AdminCreateRecipeModalPage;
  let fixture: ComponentFixture<AdminCreateRecipeModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminCreateRecipeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
