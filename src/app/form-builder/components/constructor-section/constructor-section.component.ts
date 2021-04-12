import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeStyleField } from '../../../store_form-builder/store-form-builder.actions';
import { selectConstructorFields } from './../../../store_form-builder/store-form-builder.selectors';
import { ConstructorField } from './../../../store_form-builder/store-form-builder.reducer';

@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})
export class ConstructorSectionComponent implements OnInit {
  isFieldSelected$: Observable<boolean>;
  currentStatus: boolean = true;
  constructorFields: Observable<ConstructorField[]>
  
  constructorFieldsLocal = [
    'test'
  ];

  constructor(private store: Store<{ state: any }>) {
    this.constructorFields = store.select(selectConstructorFields)
  }

  ngOnInit(): void {
  }
  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

  changeSelectedField() {
    if(this.currentStatus === true){
      this.store.dispatch(changeStyleField({ isFieldSelected: this.currentStatus }));
      this.currentStatus = !this.currentStatus;
    } else  {
      this.store.dispatch(changeStyleField({ isFieldSelected: this.currentStatus }))
      this.currentStatus = !this.currentStatus;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('DATA', event.container.data)
    console.log('EVENT', event)
    if(event.previousContainer !== event.container){
      transferArrayItem(event.previousContainer.data, event.container.data,
      event.previousIndex, event.currentIndex)
  } else {
      moveItemInArray(this.constructorFieldsLocal, event.previousIndex, event.currentIndex);
    }
  }

}