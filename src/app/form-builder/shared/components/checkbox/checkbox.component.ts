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
      multi: true
    }
  ]
})

export class CheckboxComponent implements ControlValueAccessor {
 
  @Input() label: 'string';
  @Input() stylesObj!: any;
  
  isChecked : boolean;

  get value(): any {
    return this.isChecked;
  }

  onChange = (_) => {}; 
  onBlur = (_) => {};

  writeValue(checked: boolean): void {
    this.isChecked = checked;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onBlur = fn;
  }

  onChanged($event) { 
    this.isChecked = $event && $event.target && $event.target.checked;
  }

}






  

  

 





