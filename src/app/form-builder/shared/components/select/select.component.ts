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

  private value: any;
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;


  change(val): void {
    this.onChangeCallback(val);
  }

  writeValue(id: any): void {
    this.value = id;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

}
