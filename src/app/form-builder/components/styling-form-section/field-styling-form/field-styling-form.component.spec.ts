import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldStylingFormComponent } from './field-styling-form.component';

describe('FieldStylingFormComponent', () => {
  let component: FieldStylingFormComponent;
  let fixture: ComponentFixture<FieldStylingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldStylingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldStylingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
