import { Store } from '@ngrx/store';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SelectedFieldId, ConstructorField, Styles, StyleList , FormBuilderState } from 'app/interfaces/interfaces';
import { defaultValues, propNames, typeFields } from 'app/constants/constants';

import { changeFieldProp, changeInStyleList } from 'app/store_form-builder/store-form-builder.actions';
import { selectSelectedFieldId, selectConstructorFields, getStylingState } from 'app/store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})

export class FieldStylingFormComponent implements OnInit, OnDestroy {
  styles: StyleList;
  fieldType: string | undefined;
  selectedFieldId: SelectedFieldId = null;
  constructorFieldsLocal: ConstructorField[] = [];
  optionsList: string[] = [];

  public ngUnsubscribe$ = new Subject<void>();

  constructor(private store: Store<{ state: FormBuilderState }>) {}

  ngOnInit(): void {
    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedFieldId: SelectedFieldId) => {
        this.selectedFieldId = selectedFieldId;
    });

    this.store.select(selectConstructorFields)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ConstructorField[]) => {
        this.constructorFieldsLocal = res.map(item => Object.assign({}, item));

        const field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
        this.optionsList = (field?.options?.map(option => option) as string[]);

        this.fieldType = field?.type;

        switch (this.fieldType){
          case typeFields.input:
          case typeFields.textarea:
            this.store.dispatch(changeInStyleList({propToChange: propNames.placeholder, newPropState: field.placeholder}));
            break;

          case typeFields.button:
            this.store.dispatch(changeInStyleList({propToChange: propNames.text, newPropState: field.text}));
            break;

          case typeFields.checkbox:
            this.store.dispatch(changeInStyleList({propToChange: propNames.label, newPropState: field.label }));
            break;
      }
    });

    this.store.select(getStylingState)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((stylesObj) => {

        this.styles = { ...stylesObj };
    });
  }

  styleChanged(value: any, propName: any): void {
    const field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
    if (!field) {
      return;
    }

    if (propName === propNames.placeholder || propName === propNames.text || propName === propNames.label) {

      this.store.dispatch(changeFieldProp({
        constructorFieldId: this.selectedFieldId,
        propToChange:  propName,
        newPropState: value,
      }));

      this.store.dispatch(changeInStyleList({
        propToChange: propName,
        newPropState: value }));
      return;
    }

    const fieldStyles: Styles = { ...field.styles };

    fieldStyles[propName] = value;

    this.store.dispatch(changeFieldProp({
      constructorFieldId: this.selectedFieldId,
      propToChange:  propNames.styles,
      newPropState: fieldStyles
    }));

    this.store.dispatch(changeInStyleList({
      propToChange: propName,
      newPropState: value }));
  }

  addNewOption(): void {
    const field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);

    if (!field) {
      return;
    }

    let fieldOptArr: string[] = [];

    if (field.options) {
      fieldOptArr = field.options;
    }

    const newOptionsArr: string[] = [...fieldOptArr];

    newOptionsArr.push(defaultValues.option[0]);

    this.store.dispatch(
      changeFieldProp({ constructorFieldId: this.selectedFieldId, propToChange: propNames.options, newPropState: newOptionsArr }));
  }

  changeInputValue(event: any, index: number): void {
    const value = event.target.value;
    this.optionsList.splice(index, 1, value);
    this.store.dispatch(
      changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.options, newPropState: this.optionsList }));
  }

  deleteOption(index: number): void {
    this.optionsList.splice(index, 1);
    this.store.dispatch(
      changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.options, newPropState: this.optionsList }));
  }

  isRequiredField(): void {
    this.store.dispatch(
      changeFieldProp({ constructorFieldId: this.selectedFieldId,
        propToChange: propNames.isRequired, newPropState: !this.styles.isRequired}));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
