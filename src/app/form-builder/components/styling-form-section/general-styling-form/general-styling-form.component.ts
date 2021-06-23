import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';

import { Field, FormBuilderState, StyleList } from 'app/interfaces/interfaces';
import { styles } from 'app/constants/constants';

import { setConstructorFields } from 'app/store_form-builder/store-form-builder.actions';
import { selectConstructorFields } from 'app/store_form-builder/store-form-builder.selectors';


@Component({
  selector: 'app-general-styling-form',
  templateUrl: './general-styling-form.component.html',
  styleUrls: ['./general-styling-form.component.scss']
})


export class GeneralStylingFormComponent implements OnInit, OnDestroy {

  public formFields$: Observable<Field[]>;
  public ngUnsubscribe$ = new Subject<void>();

  public generalStyling = new FormGroup({});

  public localFieldsArr: Field[];
  public stylesKeysArr: string[];
  public styles: StyleList = styles;



constructor(private store: Store<{ state: FormBuilderState }>) {
  this.formFields$ = this.store.select(selectConstructorFields);
}

  ngOnInit(): void {

    this.formFields$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map(resArr => resArr.map(item => Object.assign({}, item))))
      .subscribe(resArr => this.localFieldsArr = [...resArr]);


    this.stylesKeysArr = Object.keys(this.styles);
    this.upDateControls(this.stylesKeysArr);
  }

  upDateControls(stylesArr): void {
    if (!stylesArr){
      return;
    }
    stylesArr.forEach(elem => {
      this.generalStyling.addControl(elem, new FormControl(''));
    });
  }

  onSubmit(): void {
    this.localFieldsArr.forEach(elem => elem.styles = { ...elem.styles, ...this.generalStyling.value });
    this.store.dispatch(setConstructorFields({ newConstructorArr: this.localFieldsArr }));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
