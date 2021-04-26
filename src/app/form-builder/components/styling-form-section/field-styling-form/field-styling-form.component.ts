import { changeFieldProp } from './../../../../store_form-builder/store-form-builder.actions';
import { map } from 'rxjs/operators';
import { SelectedFieldId, ConstructorField, Styles } from './../../../../store_form-builder/store-form-builder.reducer';
import { selectSelectedFieldId, selectConstructorFields } from './../../../../store_form-builder/store-form-builder.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})
export class FieldStylingFormComponent implements OnInit {

  placeholder: null | string = null;
  width: null | number = null;
  height: null | number = null;
  border: null | string = null
  fontSize: null | number = null;
  fontWeightSelect: null | number = null;
  color: null | number = null;
  isRequired: boolean;
  
  selectedFieldId : SelectedFieldId = null;
  constructorFieldsLocal: ConstructorField[] = []

  constructor(private store: Store<{state : any}>) {
    store.select(selectSelectedFieldId).subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId;
    })
    store.select(selectConstructorFields).subscribe((res: ConstructorField[]) => {
      this.constructorFieldsLocal = res.map(item => Object.assign({}, item));
      let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);

      if (!field)
        return;

      console.log('this.selectedFieldId', this.selectedFieldId)
      this.placeholder = field.placeholder ?? this.placeholder;
      
    })

  }

  styleChanged(value: any, propName: any) {
    let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
    
    if (!field)
      return;

    if (propName === 'placeholder') {
      this.store.dispatch(changeFieldProp({
        constructorFieldId: this.selectedFieldId,
        propToChange:  'placeholder',
        newPropState: value
      }));

      return;
    }  

    const fieldStyles: Styles = { ...field.styles };

    fieldStyles[propName] = value;
    

    this.store.dispatch(changeFieldProp({
      constructorFieldId: this.selectedFieldId,
      propToChange:  'styles',
      newPropState: fieldStyles 
    }))
  }
  

  ngOnInit(): void {
    // let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
    // // console.log('PlaceholderText', this.placeholderText)
    
  }

}
