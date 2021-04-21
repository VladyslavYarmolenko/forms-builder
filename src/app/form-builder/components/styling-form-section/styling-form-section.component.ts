import { Store } from '@ngrx/store';
import { selectSelectedFieldId } from '../../../store_form-builder/store-form-builder.selectors';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, ViewContainerRef, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { FieldStylingFormComponent } from './field-styling-form/field-styling-form.component';
import { GeneralStylingFormComponent } from './general-styling-form/general-styling-form.component';


@Component({
  selector: 'app-styling-form-section',
  templateUrl: './styling-form-section.component.html',
  styleUrls: ['./styling-form-section.component.scss']
})

export class StylingFormSectionComponent implements OnInit {
   
  isFieldSelected$: Observable<boolean>;
  selectedPortal: Portal<any>;
  componentGeneralStylingPortal: ComponentPortal<GeneralStylingFormComponent>
  componentFieldStylingPortal: ComponentPortal<FieldStylingFormComponent>

  constructor(private _viewContainerRef: ViewContainerRef, private store: Store<{ state: any }>) { 
    store.select(selectSelectedFieldId).subscribe(selectedFieldId => {
      if (selectedFieldId === null) {
        this.selectedPortal = this.componentGeneralStylingPortal;
      } else {
        this.selectedPortal = this.componentFieldStylingPortal;
      }
    });
  }

  ngOnInit() {
    this.componentGeneralStylingPortal = new ComponentPortal(GeneralStylingFormComponent);
    this.componentFieldStylingPortal = new ComponentPortal(FieldStylingFormComponent);

    this.selectedPortal = this.componentGeneralStylingPortal;
  }
}


