import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { SelectedFieldId, ConstructorField, Styles, StyleList } from '../../../../../interfaces/interfaces';
import { defaultValues, propNames, typeFields } from './../../../../constants/constants';

import { changeFieldProp, changeInStyleList } from './../../../../store_form-builder/store-form-builder.actions';
import { selectSelectedFieldId, selectConstructorFields, getStylingState } from './../../../../store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-field-styling-form',
  templateUrl: './field-styling-form.component.html',
  styleUrls: ['./field-styling-form.component.scss']
})

export class FieldStylingFormComponent implements OnInit {
  styles: StyleList;
  
  fieldType: string | undefined;
  
  selectedFieldId : SelectedFieldId = null;
  constructorFieldsLocal: ConstructorField[] = [];
  
  optionsList: string[] = [];

  constructor(private store: Store<{state : any}>) {}

  ngOnInit(): void {
    this.store.select(selectSelectedFieldId).subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId;
    })

    this.store.select(selectConstructorFields)
    .subscribe((res: ConstructorField[]) => {
      this.constructorFieldsLocal = res.map(item => Object.assign({}, item));

      let field = this.constructorFieldsLocal.find(item => item.id == this.selectedFieldId);
      this.optionsList= <string[]>field?.options?.map(option => option);
      this.fieldType = field?.type;

      this.fieldType == typeFields.input || this.fieldType == typeFields.textarea? this.store.dispatch(changeInStyleList({propToChange: propNames.placeholder, newPropState: field.placeholder})) : null;
      this.fieldType  == typeFields.button? this.store.dispatch(changeInStyleList({propToChange: propNames.text, newPropState: field.text})) : null;
      this.fieldType === typeFields.checkbox? this.store.dispatch(changeInStyleList({propToChange: propNames.label, newPropState: field.label })) : null;
    })

    this.store.select(getStylingState)
      .subscribe((stylesObj) => {
        this.styles = {...stylesObj};
    })
  }

  styleChanged(value: any, propName: any) {
    let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);
    if (!field)
      return;
    
    if (propName === propNames.placeholder || propName === propNames.text || propName === propNames.label) {
    
      this.store.dispatch(changeFieldProp({
        constructorFieldId: this.selectedFieldId,
        propToChange:  propName,
        newPropState: value,
      }));

      this.store.dispatch(changeInStyleList({
        propToChange: propName, 
        newPropState: value }))
      return;
    }

    const fieldStyles: Styles = { ...field.styles };

    fieldStyles[propName] = value;

    this.store.dispatch(changeFieldProp({
      constructorFieldId: this.selectedFieldId,
      propToChange:  propNames.styles,
      newPropState: fieldStyles
    }))

    this.store.dispatch(changeInStyleList({
      propToChange: propName, 
      newPropState: value }))
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

    arr.push(defaultValues.option[0]);

    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId, propToChange: propNames.options, newPropState: arr }))
  }

  changeInputValue(event: any, index: number){
    let value = event.target.value;
    this.optionsList.splice(index, 1, value)
    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.options, newPropState: this.optionsList }))
  }

  deleteOption(index : number){
    this.optionsList.splice(index, 1);
    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.options, newPropState: this.optionsList }))
  }

  isRequiredField(){
    this.store.dispatch(changeFieldProp({ constructorFieldId: this.selectedFieldId , propToChange: propNames.isRequired, newPropState: !this.styles.isRequired}))
    
  }
}
