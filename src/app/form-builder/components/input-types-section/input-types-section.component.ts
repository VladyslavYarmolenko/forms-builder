// import { setDraggableField } from '../../../store_form-builder/store-form-builder.actions';
// import { selectDraggableField } from '../../../store_form-builder/store-form-builder.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-input-types-section',
  templateUrl: './input-types-section.component.html',
  styleUrls: ['./input-types-section.component.scss']
})
export class InputTypesSectionComponent {

  constructor(private store: Store<{ state: any }>) {}
  
  // fieldTypes = [
  //   {
  //     type: 'input',
  //     styles: {'some' : 'some'}
  //   },
  //   {
  //     type: 'textarea',
  //     styles: {'some' : 'some'}
  //   },
  //   {
  //     type: 'button',
  //     styles: {'some' : 'some'}
  //   },
  //   {
  //     type: 'checkbox',
  //     styles: {'some' : 'some'}
  //   },
  //   {
  //     type: 'select',
  //     styles: {'some' : 'some'}
  //   }
  // ]

  fieldTypes = [
    'input',
    'textarea',
    'button',
    'checkbox',
    'select',
  ]

  startDrag(event: any) {
    // const field = event.source.element.nativeElement
    // const fieldType =  field.getAttribute('data-type');

    // if (!fieldType)
    //   return;
// 
    // this.store.dispatch(setDraggableField({ draggableField: fieldType }));
  }
}
