
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { MatIconModule } from '@angular/material/icon';

import { InputTypesSectionComponent } from './components/input-types-section/input-types-section.component';
import { ConstructorSectionComponent } from './components/constructor-section/constructor-section.component';
import { 
  StylingFormSectionComponent
  // ,ComponentPortalExample 
} from './components/styling-form-section/styling-form-section.component';
import { FormBuilderComponent } from './form-builder.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    PortalModule,
    MatIconModule
  ],
  entryComponents: 
    [
      StylingFormSectionComponent,
      // ComponentPortalExample
    ],
  declarations: [
    FormBuilderComponent,
    InputTypesSectionComponent,
    ConstructorSectionComponent,
    StylingFormSectionComponent,
    // ComponentPortalExample
  ],
  exports: [FormBuilderComponent],
  providers: [],
  bootstrap: [FormBuilderComponent]
})

export class FormBuilderModule { }
