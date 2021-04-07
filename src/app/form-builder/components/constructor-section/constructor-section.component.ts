import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import * as EventEmitter from 'node:events';

@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})
export class ConstructorSectionComponent implements OnInit {
  @Output() onSelectField = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedField(status: boolean) {
    this.onSelectField.emit(status);
  }

}
