import { SelectedFieldId, ConstructorField } from './../../../../store_form-builder/store-form-builder.reducer';
import { selectConstructorFields, selectSelectedFieldId } from './../../../../store_form-builder/store-form-builder.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'general-styling-form',
  templateUrl: './general-styling-form.component.html',
  styleUrls: ['./general-styling-form.component.scss']
})


export class GeneralStylingFormComponent implements OnInit {
  selectedFieldId : SelectedFieldId = null;

  constructor(private store: Store<{state : any}>) {
    store.select(selectSelectedFieldId).subscribe((selectedFieldId: SelectedFieldId) => {
      this.selectedFieldId = selectedFieldId;
    })
    // store.select(selectConstructorFields).subscribe((res: ConstructorField[]) => {
    //   this.constructorFieldsLocal = res.map(item => Object.assign({}, item));
    //   let field = this.constructorFieldsLocal.find(item => item.id === this.selectedFieldId);

    //   if (!field)
    //     return;

    // })
  }

  ngOnInit(): void {
  }

}

