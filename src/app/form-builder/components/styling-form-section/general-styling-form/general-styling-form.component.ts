import { setConstructorFields } from './../../../../store_form-builder/store-form-builder.actions';
import { ConstructorField } from '../../../../../interfaces/interfaces';
import { selectConstructorFields } from './../../../../store_form-builder/store-form-builder.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'general-styling-form',
  templateUrl: './general-styling-form.component.html',
  styleUrls: ['./general-styling-form.component.scss']
})




export class GeneralStylingFormComponent implements OnInit {

width: null | string = null;
height: null | number = null;
border: null | string = null
fontSize: null | number = null;
fontWeight: null | number = null;
color: null | number = null;

 constructorFieldLocal: ConstructorField[] = [];

  constructor(private store: Store<{state : any}>) {
    
    store.select(selectConstructorFields).subscribe((res: ConstructorField[]) => {
      this.constructorFieldLocal = res.map(item => Object.assign({}, item));
      
    })
  }

  globalStyleChange(value: any, propName: any){
    this.constructorFieldLocal.forEach(element => element.styles = { ...element.styles, [propName]: value })
    console.log('constructorFieldLocal',this.constructorFieldLocal)

    this.store.dispatch(setConstructorFields({newConstructorArr : this.constructorFieldLocal}))
  }
  ngOnInit(): void {
  }

}

