import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


import { AuthService } from 'app/services/auth.service';

import {
  ActionTypes,
  LoginFailedAction,
  LoginSuccessAction,
  RegisterFailedAction,
  RegisterSuccessAction,
} from './store-auth.actions';


@Injectable()

export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  onLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Login),
      exhaustMap(action =>
        this.authService.login(action).pipe(
          map((res) => {
            localStorage.setItem('token', res.accessToken);

            this.router.navigate(['/form-builder']);

            return  LoginSuccessAction(action);
          }),
          catchError(error => of(LoginFailedAction(error)))
        )
      )
    ));

  onRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Register),
      exhaustMap(action =>
        this.authService.register(action).pipe(
          map((res) => {
            localStorage.setItem('token', res.accessToken);

            this.router.navigate(['/form-builder']);

            return  RegisterSuccessAction(action);
          }),
          catchError(error => of(RegisterFailedAction(error)))
        )
      )
    ));
}
