
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormBuilderModule } from './form-builder/form-builder.module';
import { StoreModule } from '@ngrx/store';

import * as fromReducer './store/example.reducer';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    FormBuilderModule,
    StoreModule.forRoot({example: fromReducer.reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
