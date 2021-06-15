import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { ConstructorField, FieldTypes, FormBuilderState, selectedFieldId, StyleList, Styles } from 'app/interfaces/interfaces';
import { typeFields } from 'app/constants/constants';

import {
  addConstructorField, deleteField,
  setConstructorFields,
  setSelectedFieldId
} from 'app/store_form-builder/store-form-builder.actions';

import { selectConstructorFields,
         selectSelectedFieldId } from 'app/store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})

export class ConstructorSectionComponent implements OnInit, OnDestroy {
  public isDisabled = true;
  public fieldTypes: string[];
  public styles: StyleList;
  public selectedFieldId: selectedFieldId = null;
  public isRequired: boolean | undefined;

  public formFields$: Observable<ConstructorField[]>;
  public ngUnsubscribe$ = new Subject<void>();

  formConstructor: FormGroup = new FormGroup({});

  constructor(private store: Store<{ state: FormBuilderState }>) {}

  ngOnInit(): void {

    this.fieldTypes = [...Object.values(typeFields)];

    this.formFields$ = this.store.select(selectConstructorFields)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map(resArr => {
          return resArr.map(item => Object.assign({}, item))
            .sort((a: ConstructorField, b: ConstructorField) => a.order > b.order ? 1 : -1);
        }),
        tap(resArr => {
          this.updateControls(resArr);
        }));

    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedFieldId: selectedFieldId) => {
        this.selectedFieldId = selectedFieldId;

      });
  }

  handleSelectOpenedChange(status: MouseEvent, i: number): void {
    if (!status) {
      return;
    }

    this.handleFieldClick(i);
  }

  handleFieldClick(index: number): void {

    this.store.dispatch(setSelectedFieldId({ selectedFieldId: index }));
    this.isDisabled = false;
  }

  handleChangeField(): void {
    this.store.dispatch(setSelectedFieldId({ selectedFieldId: null }));
    this.isDisabled = true;
  }

  handleDeleteField(): void {
    this.store.dispatch(deleteField());
    this.isDisabled = true;
  }


  // setConstructorFieldsOrder(prevIndex: number, currentIndex: number): ConstructorField[] {
  //   let arr = [...this.constructorFieldsLocal];
  //
  //   const orderedField = arr[prevIndex];
  //
  //   arr.splice(prevIndex, 1);
  //   arr.splice(currentIndex, 0, orderedField);
  //
  //   arr.map((item: ConstructorField, index: number, array: ConstructorField[]) => {
  //     if (index === currentIndex) {
  //       item.order = currentIndex;
  //     }
  //
  //     if (currentIndex < prevIndex && index > currentIndex) {
  //       item.order++;
  //     } else if (currentIndex > prevIndex && index >= prevIndex && index < currentIndex) {
  //       item.order--;
  //     }
  //   });
  //
  //   arr = arr.sort((a: ConstructorField, b: ConstructorField) => a.order > b.order ? 1 : -1);
  //   return arr;
  // }

  updateControls(fieldsArr): void {
    fieldsArr.forEach(elem => {
      const initValue = elem.type === 'checkbox' ? false : '';
      this.formConstructor
        .addControl(elem.type + '-' + elem.id,
          new FormControl(initValue, [Validators.required, Validators.minLength(6)]));
    });
  }


  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer !== event.container){
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        const fieldType = event.previousContainer.data[event.previousIndex] as FieldTypes;

        this.store.dispatch(addConstructorField({ constructorFieldType: fieldType }));

    } else {

        const prevIndex = event.previousIndex;
        const currentIndex = event.currentIndex;

        moveItemInArray(this.fieldTypes, event.previousIndex, event.currentIndex);
        // const reorderedArray = this.setConstructorFieldsOrder(prevIndex, currentIndex);

        // this.store.dispatch(setConstructorFields({newConstructorArr: reorderedArray}));
    }
  }

  onSubmit(): void {
    alert(JSON.stringify(this.formConstructor.value));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
