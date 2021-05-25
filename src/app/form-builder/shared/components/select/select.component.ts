
import { Component, forwardRef, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})

export class SelectComponent implements  ControlValueAccessor {
  

  @Input() options: string[];
  @Input() stylesObj!: any; 
  @Input() label: string;
  

  get value(): any {
    return this.value
    console.log(this.value)
  }


  constructor(){}


  public onChange: any = (value) => {};
  public onTouched: any = () => {};


 
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { 
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this.onChange(value);
  }
}