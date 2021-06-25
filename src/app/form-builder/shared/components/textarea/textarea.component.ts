import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})

export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() stylesObj!: any;
  @Input() isRequired: boolean;

  @Input()
  set value(value: any) {
    this.Value = value;
    this.writeValue(value);
  }

  Value: any = '';

  onChange = (value) => {};

  onTouched = () => {};

  ngOnInit(): void {}

  writeValue(value): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
