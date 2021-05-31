import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
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

  // tslint:disable-next-line:variable-name
  _value: any = '';

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
