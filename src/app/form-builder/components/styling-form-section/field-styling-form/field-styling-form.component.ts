import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { selectedFieldId, FormBuilderState, Field } from 'app/interfaces/interfaces';

import { changeFieldStyles } from 'app/store_form-builder/store-form-builder.actions';
import { selectSelectedFieldId, selectConstructorFields } from 'app/store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})

export class FieldStylingFormComponent implements OnInit, OnDestroy {

  public selectedFieldId: selectedFieldId;
  public formFields$: Observable<Field[]>;
  public stylesForm = new FormGroup({});
  public ngUnsubscribe$ = new Subject<void>();
  public stylesKeysArr: string[];
  public selectedField: Field;

  constructor(private store: Store<{ state: FormBuilderState }>) {
    this.formFields$ = this.store.select(selectConstructorFields);
  }

  ngOnInit(): void {

    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedId: selectedFieldId) => {

        this.selectedFieldId = selectedId;
    });

    this.store.select(selectConstructorFields).subscribe(
      fieldsArr => {

        if (this.selectedFieldId === null) {
            return;
        }

        this.selectedField = fieldsArr.find(field => field.id === this.selectedFieldId);

        const fieldStyles = {...this.selectedField.styles};

        if (!fieldStyles){
          return ;
        }
        this.stylesKeysArr = Object.keys(fieldStyles);

      }
    );

    this.upDateControls(this.stylesKeysArr);
  }

  upDateControls(stylesArr): void{
      if (!stylesArr){
        return;
      }
      stylesArr.forEach(elem => {
      this.stylesForm.addControl(elem, new FormControl(''));
    });
  }

  onSubmit(): void {
    this.store.dispatch(changeFieldStyles({newStyles: this.stylesForm.value}));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
