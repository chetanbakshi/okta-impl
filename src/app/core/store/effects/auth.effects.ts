import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { API } from '../../constants/api';
import {Login} from '../../models/login';




@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private appService: AppService,
    private authService: AuthService
  ) { }

  loadConfig$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loadAuthConfig.type),
      mergeMap(
        () => this.appService.get(API.OKTA_CONFIG).pipe(
          map(
            (res: any) => AuthActions.loadAuthConfigSuccess({ data: res }),
            (err: any) => AuthActions.loadAuthConfigFailure(err)
          ),
          catchError(
            (err: any) => of(AuthActions.loadAuthConfigFailure(err.error))
          )
        )
      )
    )
  )

  checkAuthenticated$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.checkAuthenticated.type),
      mergeMap(
        () => from(this.authService.checkAuthenticated()).pipe(
          map(
            (res: boolean) => AuthActions.checkAuthenticatedSuccess({ data: res }),
            (err: any) => AuthActions.checkAuthenticatedFailure(err)
          ),
          catchError(
            (err: any) => of(AuthActions.checkAuthenticatedFailure(err.errot))
          )
        )
      )
    )
  )

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loadLogin.type),
      mergeMap(
        (payload: Login) => from(this.authService.login(payload)).pipe(
          map(
            (res: any) => AuthActions.loadLoginSuccess({ data: res }),
            (err: any) => AuthActions.loadLoginFailure(err)
          ),
          catchError(
            (err: any) => of(AuthActions.loadLoginFailure(err.errot))
          )
        )
      )
    )
  )



  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loadLogout.type),
      mergeMap(
        (payload: string) => from(this.authService.logout(payload)).pipe(
          map(
            (res: any) => AuthActions.loadLogoutSuccess({ data: res }),
            (err: any) => AuthActions.loadLogoutFailure(err)
          ),
          catchError(
            (err: any) => of(AuthActions.loadLogoutFailure(err.error))
          )
        )
      )
    )
  )



}



