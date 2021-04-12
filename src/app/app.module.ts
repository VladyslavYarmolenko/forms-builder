
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormBuilderModule } from './form-builder/form-builder.module';
import { StoreModule } from '@ngrx/store';

import * as fromReducer from './store_form-builder/store-form-builder.reducer';
import { GeneralStylingFormComponent } from './form-builder/components/styling-form-section/general-styling-form/general-styling-form.component';
import { FieldStylingFormComponent } from './form-builder/components/styling-form-section/field-styling-form/field-styling-form.component';


@NgModule({
  declarations: [
    AppComponent,
    GeneralStylingFormComponent,
    FieldStylingFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    FormBuilderModule,
    StoreModule.forRoot({storeFormBuilder: fromReducer.reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
