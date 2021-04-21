import { addConstructorField, changeFieldProp } from './../../../store_form-builder/store-form-builder.actions';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSelectedFieldId } from '../../../store_form-builder/store-form-builder.actions';
import { selectConstructorFields, selectSelectedFieldId } from './../../../store_form-builder/store-form-builder.selectors';
import { ConstructorField, FieldTypes, SelectedFieldId } from './../../../store_form-builder/store-form-builder.reducer';
import { map, find } from 'rxjs/operators';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})
export class ConstructorSectionComponent implements OnInit {
  constructorFieldsTypesList: FieldTypes[] = [];
  constructorFieldsLocal: ConstructorField[] = [];
  selectedFieldId: SelectedFieldId = null;

  constructor(private store: Store<{ state: any }>) {
    store.select(selectConstructorFields).subscribe((res: ConstructorField[]) => {
      this.constructorFieldsLocal = res;
      this.constructorFieldsTypesList = <FieldTypes[]>res.map((item: ConstructorField) => item.type);
    })
    store.select(selectSelectedFieldId).subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId
    });
  }

  ngOnInit(): void {
  }

  handleFieldClick(index: number) {
    const fieldId = this.constructorFieldsLocal[index].id;
    
    console.log('CLICK', fieldId)
    this.store.dispatch(setSelectedFieldId({ selectedFieldId: fieldId }));
  }

  handleFieldClickOutside(index: number) {
    // console.log('ARR', this.constructorFieldsLocal, 'Index', index)
    const fieldId = this.constructorFieldsLocal[index].id;
    if (fieldId !== this.selectedFieldId)
      return;

    this.store.dispatch(setSelectedFieldId({ selectedFieldId: null }));
  }

  getFieldStyles(index: number) {

    const field = this.constructorFieldsLocal[index]

    return field ? field.styles : {}; 
  }

  getFieldProp(index: number, prop: string) {
    const field: ConstructorField = this.constructorFieldsLocal[index]

    //@ts-ignore
    return (field && field[prop]) ? field[prop] : null;   
  }

  toChangeFieldProp (){
    // const field: ConstructorField = this.constructorFieldsLocal[index];
    // const fieldPlaceholder = field.placeholder;

    //@ts-ignore
    this.store.dispatch(changeFieldProp({ 
      constructorFieldId: this.selectedFieldId, 
      propToChange: 'placeholder', 
      newPropState: 'Hello!'
    }));
  }

  drop(event: CdkDragDrop<any>) {
    console.log('EVENt', event)
    if(event.previousContainer !== event.container){
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const fieldType = <FieldTypes>event.previousContainer.data[event.previousIndex];
      this.store.dispatch(addConstructorField({ constructorFieldType: fieldType }))
  } else {
      moveItemInArray(this.constructorFieldsTypesList, event.previousIndex, event.currentIndex);
    }
  }

}