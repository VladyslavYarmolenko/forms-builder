import {Component, OnInit} from '@angular/core';
import {typeFields} from 'app/constants/constants';


@Component({
  selector: 'app-input-types-section',
  templateUrl: './input-types-section.component.html',
  styleUrls: ['./input-types-section.component.scss']
})

export class InputTypesSectionComponent implements OnInit {
  public fieldTypes: string[];

  ngOnInit(): void {
   this.fieldTypes = [...Object.values(typeFields)];
 }
}
