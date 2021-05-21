import { SharedModule } from './shared/shared.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { InputTypesSectionComponent } from './components/input-types-section/input-types-section.component';
import { ConstructorSectionComponent } from './components/constructor-section/constructor-section.component';
import { StylingFormSectionComponent } from './components/styling-form-section/styling-form-section.component';
import { FormBuilderComponent } from './form-builder.component';
import { FieldStylingFormComponent } from './components/styling-form-section/field-styling-form/field-styling-form.component'
import { GeneralStylingFormComponent } from './components/styling-form-section/general-styling-form/general-styling-form.component'; 


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    PortalModule,
    MatIconModule,
    ClickOutsideModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
    ],
  entryComponents: 
    [
      StylingFormSectionComponent,
      GeneralStylingFormComponent,
      FieldStylingFormComponent,
    ],
  declarations: [
    FormBuilderComponent,
    InputTypesSectionComponent,
    ConstructorSectionComponent,
    StylingFormSectionComponent,
    FieldStylingFormComponent,
    GeneralStylingFormComponent,

  ],
  exports: [FormBuilderComponent],
  providers: [],
  bootstrap: [FormBuilderComponent]
})

export class FormBuilderModule {}
