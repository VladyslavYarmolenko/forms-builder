import { isFieldSelectedState } from './../store/store.selectors';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeStyleField } from '../store/store.actions'
import { selectField } from '../store/store.selectors'
import { State } from '../store/store.reducer'

@Component({
  selector: 'app-form-builder',
  templateUrl:'./form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent{
  
}
