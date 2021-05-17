import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStylingFormComponent } from './general-styling-form.component';

describe('GeneralStylingFormComponent', () => {
  let component: GeneralStylingFormComponent;
  let fixture: ComponentFixture<GeneralStylingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralStylingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStylingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
