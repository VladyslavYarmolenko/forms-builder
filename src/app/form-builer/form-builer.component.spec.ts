import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilerComponent } from './form-builer.component';

describe('FormBuilerComponent', () => {
  let component: FormBuilerComponent;
  let fixture: ComponentFixture<FormBuilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBuilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
