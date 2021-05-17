import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

import { ConstructorField, FieldTypes, SelectedFieldId } from '../../../../interfaces/interfaces';

import { addConstructorField, returnInitialState, setConstructorFields } from './../../../store_form-builder/store-form-builder.actions';
import { setSelectedFieldId } from '../../../store_form-builder/store-form-builder.actions';
import { selectConstructorFields, selectSelectedFieldId } from './../../../store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})

export class ConstructorSectionComponent implements OnInit {
  constructorFieldsTypesList: FieldTypes[] = [];
  constructorFieldsLocal: ConstructorField[] = [];
  selectedFieldId: SelectedFieldId = null;
  isRequired: boolean = null;


  constructor(private store: Store<{ state: any }>) {}

  ngOnInit(): void {
    this.store.select(selectConstructorFields)
    .subscribe((res: ConstructorField[]) => {
      this.constructorFieldsLocal = res
        .map(item => Object.assign({}, item))
        .sort((a: ConstructorField, b: ConstructorField) => a.order > b.order ? 1 : -1);
      
        this.constructorFieldsTypesList = <FieldTypes[]>this.constructorFieldsLocal.map((item: ConstructorField) => item.type);
    })

    this.store.select(selectSelectedFieldId)
    .subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId
      let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
      console.log(field)
      if(field){
        this.isRequired == field.isRequired;
      }
    });
  }

  handleSelectOpenedChange(status: boolean, i: number) {
    if (!status)
      return;

    this.handleFieldClick(i);
  }

  handleFieldClick(index: number) {
    const fieldId = this.constructorFieldsLocal[index].id;
    
    this.store.dispatch(setSelectedFieldId({ selectedFieldId: fieldId }));
  }

  handleFieldClickOutside(event: any, index: number) {
    const target = event.target;
    const fieldId = this.constructorFieldsLocal[index].id;
    const isSelectOverlay = target.closest('.cdk-overlay-backdrop');
    const isStylesArea = target.closest('.styles');

    if (isStylesArea || isSelectOverlay || fieldId !== this.selectedFieldId)
      return;

    this.store.dispatch(setSelectedFieldId({ selectedFieldId: null }));
    this.store.dispatch(returnInitialState());
  }

  getFieldStyles(index: number) {
    const field = this.constructorFieldsLocal[index]
    return field ? field.styles : {}; 
  }

  getFieldProp(index: number, prop: string) {
    const field: ConstructorField = this.constructorFieldsLocal[index];

    //@ts-ignore
    return (field && field[prop]) ? field[prop] : null;   
  }


  setConstructorFieldsOrder(prevIndex: number, currentIndex: number) {
    let arr = [...this.constructorFieldsLocal]

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
    })

    arr = arr.sort((a: ConstructorField, b: ConstructorField) => a.order > b.order ? 1 : -1);
    
    return arr;
   
  }

  drop(event: CdkDragDrop<any>) {

  if(event.previousContainer !== event.container){
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const fieldType = <FieldTypes>event.previousContainer.data[event.previousIndex];
      this.store.dispatch(addConstructorField({ constructorFieldType: fieldType }))
  } else {
    const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    moveItemInArray(this.constructorFieldsTypesList, event.previousIndex, event.currentIndex);
    const reorderedArray = this.setConstructorFieldsOrder(prevIndex, currentIndex);

    this.store.dispatch(setConstructorFields({newConstructorArr: reorderedArray}))
    }
  }
}