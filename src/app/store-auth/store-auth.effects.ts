import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { User } from '../../interfaces/interfaces';
import { 
  ActionTypes, 
  LoginAction,
  LoginFailedAction, 
  LoginSuccessAction, 
  RegisterAction, 
  RegisterFailedAction,
  RegisterSuccessAction,
} from './store-auth.actions';
import { Router } from '@angular/router';

@Injectable()

export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  onLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Login),
      map((action: LoginAction) => action.payload),
      exhaustMap(action =>
        this.authService.login(action).pipe(
          map((res) => {
            localStorage.setItem('token', res.accessToken);

            this.router.navigate(['/form-builder']);

            return new LoginSuccessAction(action)
          }),
          catchError(error => of(new LoginFailedAction(error)))
        )
      )
    ));

  onRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.Register),
      map((action: RegisterAction) => action.payload),
      exhaustMap(action =>
        this.authService.register(action).pipe(
          map((res) => {
            localStorage.setItem('token', res.accessToken);
            
            this.router.navigate(['/form-builder']);

            return new RegisterSuccessAction(action)
          }),
          catchError(error => of(new RegisterFailedAction(error)))
        )
      )
    ));
}