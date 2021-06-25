import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SelectComponent } from './components/select/select.component';


@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    SelectComponent,
  ]
})

export class SharedModule { }
