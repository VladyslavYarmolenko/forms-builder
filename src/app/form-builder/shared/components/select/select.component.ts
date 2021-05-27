
import { Component, forwardRef, Input } from '@angular/core';
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
    return this.value;
  }

  public onChange: any = (value) => {};
  public onTouched: any = () => {};


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.onChange(value);
  }
}
