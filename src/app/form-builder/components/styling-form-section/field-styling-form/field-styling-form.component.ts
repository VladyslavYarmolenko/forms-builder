import { Store } from '@ngrx/store';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import {
  selectedFieldId,
  ConstructorField,
  StyleList,
  FormBuilderState,
  styles
} from 'app/interfaces/interfaces';
import { defaultValues, propNames, typeFields } from 'app/constants/constants';

import { changeFieldProp } from 'app/store_form-builder/store-form-builder.actions';
import { selectSelectedFieldId, selectConstructorFields } from 'app/store_form-builder/store-form-builder.selectors';
import { FormControl, FormGroup } from "@angular/forms";



@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})

export class FieldStylingFormComponent implements OnInit, OnDestroy {

  status = true;
  field;
  styles: StyleList;
  selectedFieldId: selectedFieldId = null;
  constructorFieldsLocal: ConstructorField[] = [];
  optionsList: string[] = [];

  public stylesForm = new FormGroup({});

  public ngUnsubscribe$ = new Subject<void>();

  constructor(private store: Store<{ state: FormBuilderState }>) {}

  ngOnInit(): void {
    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedFieldId: selectedFieldId) => {
        this.selectedFieldId = selectedFieldId;
    });

    this.store.select(selectConstructorFields)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ConstructorField[]) => {
        this.constructorFieldsLocal = res.map(item => Object.assign({}, item));

        this.field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
        this.styles = {...this.field.styles}
    });

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
    console.log(this.stylesForm.value)
    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId,
                                                propToChange: propNames.styles,
                                                newPropState: this.stylesForm.value }))
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
