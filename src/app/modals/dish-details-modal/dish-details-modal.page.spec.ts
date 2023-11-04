import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DishDetailsModalPage } from './dish-details-modal.page';

describe('DishDetailsModalPage', () => {
  let component: DishDetailsModalPage;
  let fixture: ComponentFixture<DishDetailsModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DishDetailsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
