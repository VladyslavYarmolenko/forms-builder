import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from './../../interfaces/interfaces';

import { getUser } from './../store-auth/store-auth.selectors';
import { RegisterAction } from './../store-auth/store-auth.actions';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
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

  onSubmit(formData: any) {
    this.store.dispatch(new RegisterAction(formData.value));
  }
}
