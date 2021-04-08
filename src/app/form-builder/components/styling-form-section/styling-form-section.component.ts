import { Store } from '@ngrx/store';
import { selectField } from './../../../store/store.selectors';
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
  componentPortal: ComponentPortal<FieldStylingFormComponent>
  componentPortal2: ComponentPortal<GeneralStylingFormComponent>

  constructor(private _viewContainerRef: ViewContainerRef, private store: Store<{ state: any }>) { 
    store.select(selectField).subscribe(isFieldSelected => {
      if (isFieldSelected) {
        this.selectedPortal = this.componentPortal
      } else {
        this.selectedPortal = this.componentPortal2
      }
    });
  }

  ngOnInit() {
    this.componentPortal = new ComponentPortal(FieldStylingFormComponent);
    this.componentPortal2 = new ComponentPortal(GeneralStylingFormComponent);

    this.selectedPortal = this.componentPortal;
  }
}


