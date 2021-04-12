import { setDraggableField } from './../../../store_form-builder/store_form-builder.actions';
import { selectDraggableField } from './../../../store_form-builder/store_form-builder.selectors';
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
  
  fieldTypes = [
    {
      type: 'input',
      styles: {'some' : 'some'}
    },
    {
      type: 'textarea',
      styles: {'some' : 'some'}
    },
    {
      type: 'button',
      styles: {'some' : 'some'}
    },
    {
      type: 'checkbox',
      styles: {'some' : 'some'}
    },
    {
      type: 'select',
      styles: {'some' : 'some'}
    }
  ]
  
  title = 'my-drag-drop';
  movies = [
 'Episode I - The Phantom Menace',
 'Episode II - Attack of the Clones',
 'Episode III - Revenge of the Sith',
 'Episode IV - A New Hope',
 'Episode V - The Empire Strikes Back',
 'Episode VI - Return of the Jedi',
 'Episode VII - The Force Awakens',
 'Episode VIII - The Last Jedi'
  ];

  todo = [
 'Get to work',
 'Pick up groceries',
 'Go home',
 'Fall asleep'
  ];

  done = [
 'Get up',
 'Brush teeth',
 'Take a shower',
 'Check e-mail',
 'Walk dog'
  ];

  startDrag(event: any) {
    const field = event.source.element.nativeElement
    const fieldType =  field.getAttribute('data-type');

    if (!fieldType)
      return;

    this.store.dispatch(setDraggableField({ draggableField: fieldType }));
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<string[]>) {
 if (event.previousContainer !== event.container) {
 transferArrayItem(event.previousContainer.data, event.container.data,
 event.previousIndex, event.currentIndex)
 } else {
 moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
 }
  }
}
