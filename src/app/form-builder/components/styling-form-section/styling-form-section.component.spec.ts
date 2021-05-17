import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingFormSectionComponent } from './styling-form-section.component';

describe('StylingFormSectionComponent', () => {
  let component: StylingFormSectionComponent;
  let fixture: ComponentFixture<StylingFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylingFormSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylingFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
