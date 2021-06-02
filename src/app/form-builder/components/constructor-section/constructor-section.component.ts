import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { ConstructorField, FieldTypes, FormBuilderState, SelectedFieldId, StyleList, Styles } from 'app/interfaces/interfaces';
import { typeFields } from 'app/constants/constants';

import { addConstructorField,
         returnInitialState,
         setConstructorFields,
         setSelectedFieldId } from 'app/store_form-builder/store-form-builder.actions';

import { getStylingState,
         selectConstructorFields,
         selectSelectedFieldId } from 'app/store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})

export class ConstructorSectionComponent implements OnInit, OnDestroy {

  public constructorFieldsLocal: ConstructorField[] = [];
  public fieldTypes: string[];
  public styles: StyleList;
  public selectedFieldId: SelectedFieldId = null;
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
          this.constructorFieldsLocal = resArr;
        }));

    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedFieldId: SelectedFieldId) => {
        this.selectedFieldId = selectedFieldId;
        const field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
        if (field){
          this.isRequired = field.isRequired;
        }
      });

    this.store.select(getStylingState)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((stylesObj) => {

        this.styles = { ...stylesObj };
      });
  }

  handleSelectOpenedChange(status: MouseEvent, i: number): void {
    if (!status) {
      return;
    }

    this.handleFieldClick(i);
  }

  handleFieldClick(index: number): void {
    const fieldId = this.constructorFieldsLocal[index].id;

    this.store.dispatch(setSelectedFieldId({ selectedFieldId: fieldId }));
  }

  handleFieldClickOutside(event: any, index: number): void {
    const target = event.target;
    const fieldId = this.constructorFieldsLocal[index].id;
    const isSelectOverlay = target.closest('.cdk-overlay-backdrop, .styling-field-select-panel');
    const isStylesArea = target.closest('.styles');

    if (isStylesArea || isSelectOverlay || fieldId !== this.selectedFieldId) {
      return;
    }

    this.store.dispatch(setSelectedFieldId({ selectedFieldId: null }));
    this.store.dispatch(returnInitialState());
  }

  getFieldStyles(index: number): Styles {
    const field = this.constructorFieldsLocal[index];
    return field ? field.styles : {};
  }

  getFieldProp(index: number, prop: string): FieldTypes {
    const field: ConstructorField = this.constructorFieldsLocal[index];

    return (field && field[prop]) ? field[prop] : null;
  }


  setConstructorFieldsOrder(prevIndex: number, currentIndex: number): ConstructorField[] {
    let arr = [...this.constructorFieldsLocal];

    const orderedField = arr[prevIndex];

    arr.splice(prevIndex, 1);
    arr.splice(currentIndex, 0, orderedField);

    arr.map((item: ConstructorField, index: number, array: ConstructorField[]) => {
      if (index === currentIndex) {
        item.order = currentIndex;
      }

      if (currentIndex < prevIndex && index > currentIndex) {
        item.order++;
      } else if (currentIndex > prevIndex && index >= prevIndex && index < currentIndex) {
        item.order--;
      }
    });

    arr = arr.sort((a: ConstructorField, b: ConstructorField) => a.order > b.order ? 1 : -1);
    return arr;
  }

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
        const reorderedArray = this.setConstructorFieldsOrder(prevIndex, currentIndex);

        this.store.dispatch(setConstructorFields({newConstructorArr: reorderedArray}));
    }
  }

  onSubmit(): any {
    alert(JSON.stringify(this.formConstructor.value));
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
