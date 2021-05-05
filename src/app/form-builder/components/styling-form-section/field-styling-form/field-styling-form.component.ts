import { changeFieldProp } from './../../../../store_form-builder/store-form-builder.actions';
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
  text: null | string = null;
  label: null | string = null;
  width: null | string = null;
  height: null | number = null;
  border: null | string = null
  fontSize: null | number = null;
  fontWeight: null | number = null;
  color: null | number = null;
  isRequired: boolean;
  optionsList: string[] = [];
  fieldType: string | undefined;
  
  selectedFieldId : SelectedFieldId = null;
  constructorFieldsLocal: ConstructorField[] = []

  constructor(private store: Store<{state : any}>) {
    store.select(selectSelectedFieldId).subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId;
    })
    store.select(selectConstructorFields).subscribe((res: ConstructorField[]) => {
      this.constructorFieldsLocal = res.map(item => Object.assign({}, item));
      let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
      this.optionsList= <string[]>field?.options?.map(option => option);

      this.fieldType = field?.type
      

      if (!field) 
        return;


      this.placeholder = field.placeholder ?? this.placeholder;
      this.text = field.text ?? this.text;
      this.label = field.label ?? this.label;
      
      if (!field.styles)
        return;

      this.width = field.styles.width ?? this.width;
      this.height = field.styles.height ?? this.height;
      this.border = field.styles.border ?? this.border;
      this.fontSize = field.styles.fontSize ?? this.fontSize;
      this.fontWeight = field.styles.fontWeight ?? this.fontWeight;
      this.isRequired = field.styles.isRequired ?? this.isRequired;

    })
  }

  styleChanged(value: any, propName: any) {
    let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
    
    if (!field)
      return;

    if (propName === 'placeholder' || propName === 'text' || propName === 'label') {
      this.store.dispatch(changeFieldProp({
        constructorFieldId: this.selectedFieldId,
        propToChange:  propName,
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
  
  addNewOption() {
    let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);

    if (!field)
      return;

    let fieldOptArr: string[] = [] 

    if (field.options) {
      fieldOptArr = field.options;
    }

    let arr: string[] = [...fieldOptArr];

    arr.push('Default option');

    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: 'options', newPropState: arr }))
  }

  changeInputValue(event: any, index: number){
    let value = event.target.value;
    this.optionsList.splice(index, 1, value)
    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: 'options', newPropState: this.optionsList }))
  }

  deleteOption(index : number){
    this.optionsList.splice(index, 1);
    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: 'options', newPropState: this.optionsList }))
  }
  ngOnInit(): void {
  }

}
