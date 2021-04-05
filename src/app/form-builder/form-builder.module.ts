
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { InputTypesSectionComponent } from './components/input-types-section/input-types-section.component';
import { ConstructorSectionComponent } from './components/constructor-section/constructor-section.component';
import { StylingFormSectionComponent } from './components/styling-form-section/styling-form-section.component';
import { FormBuilderComponent } from './form-builder.component';


@NgModule({
  declarations: [
    FormBuilderComponent,
    InputTypesSectionComponent,
    ConstructorSectionComponent,
    StylingFormSectionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
  ],
  exports: [FormBuilderComponent],
  providers: [],
  bootstrap: [FormBuilderComponent]
})
export class FormBuilderModule { }
