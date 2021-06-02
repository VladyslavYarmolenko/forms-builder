import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { User } from 'app/interfaces/interfaces';

import { getUser } from 'app/store-auth/store-auth.selectors';
import { RegisterAction } from 'app/store-auth/store-auth.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user$: Observable<User>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.user$ = this.store.select(getUser);
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(formData: any): void {
    this.store.dispatch(RegisterAction(formData.value));
  }

  ngOnDestroy(): void {
    this.user$.pipe(first());
  }
}
