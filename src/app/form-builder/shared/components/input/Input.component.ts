import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() stylesObj!: any;

  @Input()
    set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }

  _value: any = '';

  get value(): any {
    return this._value;
  }

  constructor() {
  }

  
  onChange = (value) => {};

  onTouched = () => {};

  ngOnInit(): void {}

  writeValue(value): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}

 

