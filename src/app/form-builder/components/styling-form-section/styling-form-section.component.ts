import { Store } from '@ngrx/store';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormBuilderState } from 'app/interfaces/interfaces';

import { selectSelectedFieldId } from 'app/store_form-builder/store-form-builder.selectors';
import { FieldStylingFormComponent } from './field-styling-form/field-styling-form.component';
import { GeneralStylingFormComponent } from './general-styling-form/general-styling-form.component';


@Component({
  selector: 'app-styling-form-section',
  templateUrl: './styling-form-section.component.html',
  styleUrls: ['./styling-form-section.component.scss']
})

export class StylingFormSectionComponent implements OnInit, OnDestroy {
  selectedPortal: Portal<any>;
  componentGeneralStylingPortal: ComponentPortal<GeneralStylingFormComponent>;
  componentFieldStylingPortal: ComponentPortal<FieldStylingFormComponent>;
  public ngUnsubscribe$ = new Subject<void>();

  constructor(private viewContainerRef: ViewContainerRef, private store: Store<{ state: FormBuilderState }>) {}

  ngOnInit(): void {
    this.store.select(selectSelectedFieldId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(selectedFieldId => {
      if (selectedFieldId === null) {
        this.selectedPortal = this.componentGeneralStylingPortal;
      } else {
        this.selectedPortal = this.componentFieldStylingPortal;
      }
    });
    this.componentGeneralStylingPortal = new ComponentPortal(GeneralStylingFormComponent);
    this.componentFieldStylingPortal = new ComponentPortal(FieldStylingFormComponent);

    this.selectedPortal = this.componentGeneralStylingPortal;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}


