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
      console.log(this.constructorFieldsTypesList)
    })
    store.select(selectSelectedFieldId).subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId
    });
  }

  ngOnInit(): void {
  }

  handleFieldClick(index: number) {
    const fieldId = this.constructorFieldsLocal[index].id;
  
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

  setConstructorFieldsOrder(prevIndex: number, currentIndex: number) {
    let arr = [...this.constructorFieldsLocal]
    arr = arr.map(item => Object.assign({}, item));
    console.log('START', JSON.stringify(arr))
    const orderedField = arr[prevIndex];

    arr.splice(prevIndex, 1);
    console.log('REMOVED', JSON.stringify(arr))
    arr.splice(currentIndex, 0, orderedField);
    console.log('INSERTED', JSON.stringify(arr))

    arr.map((item: ConstructorField, index: number, array: ConstructorField[]) => {
      if (index === currentIndex) {
        item.order = currentIndex;
      }

      if (currentIndex < prevIndex && index > currentIndex) {
        console.log('IF')
        item.order++;
      } else if (currentIndex > prevIndex && index >= prevIndex && index < currentIndex) {
        // console.log('ELSE')
        // console.log('PREV CURRENT', prevIndex, currentIndex)
        item.order--;
      }

    })

    console.log('ARRAY', arr)


    // console.log('this.constructorFieldsLocal', this.constructorFieldsLocal)
    // let arr = [...this.constructorFieldsLocal]
    // arr = arr.map(item => Object.assign({}, item));
    
    // let removedElems = arr.splice(currentIndex + 1);
    // arr[arr.length - 1].order = currentIndex;

    // for(let i = 0; i < removedElems.length; i++){
    //   removedElems[i].order = removedElems[i].order + 1
    // }

    // const result = arr.concat(removedElems)
    // console.log('RESULT', result)
  }

  drop(event: CdkDragDrop<any>) {
    // console.log('EVENt', event, event.previousContainer !== event.container)

  if(event.previousContainer !== event.container){
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const fieldType = <FieldTypes>event.previousContainer.data[event.previousIndex];
      this.store.dispatch(addConstructorField({ constructorFieldType: fieldType }))
  } else {
    const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    // const field = this.constructorFieldsLocal[previousIndex];

      moveItemInArray(this.constructorFieldsTypesList, event.previousIndex, event.currentIndex);
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const reorderedArray = this.setConstructorFieldsOrder(prevIndex, currentIndex); 
    }
  }
}