import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { LoginAction } from 'app/store-auth/store-auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private store: Store, private router: Router) {}

  onSubmit(formData: any): void {
    this.store.dispatch(LoginAction(formData.value));
  }

  ngOnInit(): void {}

  redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
}
