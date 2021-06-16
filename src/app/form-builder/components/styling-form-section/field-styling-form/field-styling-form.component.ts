import { Store } from '@ngrx/store';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, filter, find, map, take, takeUntil, tap } from 'rxjs/operators';

import {
  selectedFieldId,
  ConstructorField,
  StyleList,
  FormBuilderState,
  styles, Styles, Field
} from 'app/interfaces/interfaces';
import { defaultValues, propNames, typeFields } from 'app/constants/constants';

import { changeFieldProp, changeFieldStyles } from 'app/store_form-builder/store-form-builder.actions';
import { selectSelectedFieldId, selectConstructorFields } from 'app/store_form-builder/store-form-builder.selectors';
import { FormControl, FormGroup } from "@angular/forms";




@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})

export class FieldStylingFormComponent implements OnInit, OnDestroy {

  public selectedFieldId: selectedFieldId;

  public  formFields$: Observable<ConstructorField[]>;

  public stylesForm = new FormGroup({});

  public ngUnsubscribe$ = new Subject<void>();

  // optionsList: string[] = [];

  constructor(private store: Store<{ state: FormBuilderState }>) {
    this.formFields$ = this.store.select(selectConstructorFields);
  }

  ngOnInit(): void {

    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedFieldId: selectedFieldId) => {
        this.selectedFieldId = selectedFieldId;

    });

    this.formFields$
      .pipe(takeUntil(this.ngUnsubscribe$),
            concatMap(fields => fields),
            filter(fields => fields.id !== this.selectedFieldId))

   this.upDateControls(styles);

  }

  upDateControls(objOfStyles){

    const propsArr = Object.keys(objOfStyles);

    propsArr.forEach(elem => {
      this.stylesForm.addControl(elem, new FormControl(''))
    })
  }


  // addNewOption(): void {
  //   const field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
  //
  //   if (!field) {
  //     return;
  //   }
  //
  //   let fieldOptArr: string[] = [];
  //
  //   if (field.options) {
  //     fieldOptArr = field.options;
  //   }
  //
  //   const newOptionsArr: string[] = [...fieldOptArr];
  //
  //   newOptionsArr.push(defaultValues.option[0]);
  //
  //   this.store.dispatch(
  //     changeFieldProp({ constructorFieldId: this.selectedFieldId, propToChange: propNames.options, newPropState: newOptionsArr }));
  // }
  //
  // changeInputValue(event: any, index: number): void {
  //   const value = event.target.value;
  //   this.optionsList.splice(index, 1, value);
  //   this.store.dispatch(
  //     changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.options, newPropState: this.optionsList }));
  // }
  //
  // deleteOption(index: number): void {
  //   this.optionsList.splice(index, 1);
  //   this.store.dispatch(
  //     changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.options, newPropState: this.optionsList }));
  // }
  //

  onSubmit() : void {
    this.store.dispatch(changeFieldStyles({newStyles: this.stylesForm.value}))
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
