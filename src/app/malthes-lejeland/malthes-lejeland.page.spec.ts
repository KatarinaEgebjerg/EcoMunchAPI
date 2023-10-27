import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MalthesLejelandPage } from './malthes-lejeland.page';

describe('MalthesLejelandPage', () => {
  let component: MalthesLejelandPage;
  let fixture: ComponentFixture<MalthesLejelandPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MalthesLejelandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
