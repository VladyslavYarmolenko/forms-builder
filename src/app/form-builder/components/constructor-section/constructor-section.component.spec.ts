import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorSectionComponent } from './constructor-section.component';

describe('FormBuilderSectionComponent', () => {
  let component: ConstructorSectionComponent;
  let fixture: ComponentFixture<ConstructorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
