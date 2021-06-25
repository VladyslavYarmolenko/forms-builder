import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { Field, FieldTypes, FormBuilderState, selectedFieldId, StyleList } from 'app/interfaces/interfaces';
import { typeFields } from 'app/constants/constants';
import { AuthService } from 'app/services/auth.service';

import {
  addConstructorField,
  deleteField,
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

  public formFields$: Observable<Field[]>;
  public ngUnsubscribe$ = new Subject<void>();

  formConstructor: FormGroup = new FormGroup({});

  constructor(private store: Store<{ state: FormBuilderState }>, private authService: AuthService) {}

  ngOnInit(): void {
    this.fieldTypes = [...Object.values(typeFields)];

    this.formFields$ = this.store.select(selectConstructorFields)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map(resArr => resArr.map(item => Object.assign({}, item))),
        tap(resArr => this.updateControls(resArr)));

    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((selectedId: selectedFieldId) => {
        this.selectedFieldId = selectedId;
      });
  }

  handleSelectOpenedChange(status: MouseEvent, i: number): void {
    if (!status) {
      return;
    }

    this.handleFieldClick(i);
  }

  handleFieldClick(index: number): void {
    this.store.dispatch(setSelectedFieldId({ selectedId: index }));
    this.isDisabled = false;
  }

  handleChangeField(): void {
    this.store.dispatch(setSelectedFieldId({ selectedId: null }));
    this.isDisabled = true;
  }

  handleDeleteField(): void {
    this.store.dispatch(deleteField());
    this.isDisabled = true;
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
        moveItemInArray(this.fieldTypes, event.previousIndex, event.currentIndex);
    }
  }

  onSubmit(): void {
    alert(JSON.stringify(this.formConstructor.value));
  }

  onLogout(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
