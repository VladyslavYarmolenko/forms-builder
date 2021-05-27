import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConstructorField, FormBuilderState, StyleList } from 'app/interfaces/interfaces';

import { setConstructorFields } from 'app/store_form-builder/store-form-builder.actions';
import { getStylingState, selectConstructorFields } from 'app/store_form-builder/store-form-builder.selectors';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'general-styling-form',
  templateUrl: './general-styling-form.component.html',
  styleUrls: ['./general-styling-form.component.scss']
})


export class GeneralStylingFormComponent implements OnInit, OnDestroy {

styles: StyleList;
public ngUnsubscribe$ = new Subject<void>();

constructorFieldLocal: ConstructorField[] = [];

constructor(private store: Store<{ state: FormBuilderState }>) {}

  ngOnInit(): void {
    this.store.select(selectConstructorFields)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ConstructorField[]) => {
        this.constructorFieldLocal = res.map(item => Object.assign({}, item));
    });

    this.store.select(getStylingState)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((stylesObj) => {

        this.styles = { ...stylesObj };
    });
}

  globalStyleChange(value: any, propName: any): void {
    this.constructorFieldLocal.forEach(element => element.styles = { ...element.styles, [propName]: value });
    this.store.dispatch(setConstructorFields({newConstructorArr : this.constructorFieldLocal}));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
