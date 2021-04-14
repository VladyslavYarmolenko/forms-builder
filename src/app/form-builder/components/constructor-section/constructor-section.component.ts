import { addConstructorField } from './../../../store_form-builder/store-form-builder.actions';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSlectedFieldId } from '../../../store_form-builder/store-form-builder.actions';
import { selectConstructorFields, selectSelectedFieldId } from './../../../store_form-builder/store-form-builder.selectors';
import { ConstructorField, FieldTypes, SelectedFieldId } from './../../../store_form-builder/store-form-builder.reducer';
import { map, find } from 'rxjs/operators';

@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})
export class ConstructorSectionComponent implements OnInit {
  constructorFieldsTypesList: string[] = [];
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
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

  // changeSelectedField(id: number) {
  //   if(this.selectedFieldId){
  //     this.store.dispatch(changeStyleField({ isFieldSelected: this.currentStatus }));
  //     this.currentStatus = !this.currentStatus;
  //   } else  {
  //     this.store.dispatch(changeStyleField({ isFieldSelected: this.currentStatus }))
  //     this.currentStatus = !this.currentStatus;
  //   }
  // }

  handleFieldClick(index: number) {
    const fieldId = this.constructorFieldsLocal[index].id;
    this.store.dispatch(setSlectedFieldId({ selectedFieldId: fieldId }));
  }

  handleFieldClickOutside(index: number) {
    const fieldId = this.constructorFieldsLocal[index].id;
    
    if (fieldId !== this.selectedFieldId)
      return;

    this.store.dispatch(setSlectedFieldId({ selectedFieldId: null }));
  }

  getFieldStyles(fieldType: FieldTypes) {
    
    const field = this.constructorFieldsLocal.find((item: ConstructorField) => item.type === fieldType)

    return field ? field.styles : {}; 
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer !== event.container){
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const fieldType = <FieldTypes>event.previousContainer.data[event.previousIndex];
      this.store.dispatch(addConstructorField({ constructorFieldType: fieldType }))
  } else {
      moveItemInArray(this.constructorFieldsTypesList, event.previousIndex, event.currentIndex);
    }
  }

}