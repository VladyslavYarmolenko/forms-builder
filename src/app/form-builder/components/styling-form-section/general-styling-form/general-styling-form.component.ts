import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ConstructorField, StyleList } from '../../../../../interfaces/interfaces';

import { setConstructorFields } from './../../../../store_form-builder/store-form-builder.actions';
import { getStylingState, selectConstructorFields } from './../../../../store_form-builder/store-form-builder.selectors';

@Component({
  selector: 'general-styling-form',
  templateUrl: './general-styling-form.component.html',
  styleUrls: ['./general-styling-form.component.scss']
})


export class GeneralStylingFormComponent implements OnInit {

styles: StyleList;

constructorFieldLocal: ConstructorField[] = [];

constructor(private store: Store<{state : any}>) {}
  
  ngOnInit(): void {
    this.store.select(selectConstructorFields)
    .subscribe((res: ConstructorField[]) => {
      this.constructorFieldLocal = res.map(item => Object.assign({}, item));
    })

    this.store.select(getStylingState)
      .subscribe((stylesObj) => {
        this.styles = {...stylesObj};
    })
}

  globalStyleChange(value: any, propName: any){
    this.constructorFieldLocal.forEach(element => element.styles = { ...element.styles, [propName]: value })
    this.store.dispatch(setConstructorFields({newConstructorArr : this.constructorFieldLocal}))
  }

}