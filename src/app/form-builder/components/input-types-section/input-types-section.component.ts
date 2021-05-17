import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-input-types-section',
  templateUrl: './input-types-section.component.html',
  styleUrls: ['./input-types-section.component.scss']
})
export class InputTypesSectionComponent implements OnInit {

  constructor(private store: Store<{ state: any }>) {}

  ngOnInit() {
    
  }

  fieldTypes = [
    'input',
    'textarea',
    'button',
    'checkbox',
    'select',
  ]
}
