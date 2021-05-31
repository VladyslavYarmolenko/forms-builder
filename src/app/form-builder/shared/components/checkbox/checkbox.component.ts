import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ]
})

export class CheckboxComponent implements ControlValueAccessor {
  constructor() {}

  @Input() label: 'string';
  @Input() stylesObj!: any;

  value: boolean;

  onChange = (_) => {};
  onBlur = (_) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
    console.log('VALUE', value)
    this.onChange(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    console.log('fn', fn)
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
















