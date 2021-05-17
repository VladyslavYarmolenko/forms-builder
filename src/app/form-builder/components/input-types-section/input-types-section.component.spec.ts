import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTypesSectionComponent } from './input-types-section.component';

describe('InputTypesSectionComponent', () => {
  let component: InputTypesSectionComponent;
  let fixture: ComponentFixture<InputTypesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTypesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
