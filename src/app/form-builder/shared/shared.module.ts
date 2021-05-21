
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/Input.component';
import { TextareaComponent } from './components/textarea/textarea.component';


@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    InputComponent,
    TextareaComponent,
  ]
})

export class SharedModule { }
