import { createAction, props } from '@ngrx/store';
import { AuthConfig } from '../../models/auth-config';


// Okta Config Actions
export const loadAuthConfig = createAction(
  '[Auth] Load Auth Config'
);
export const loadAuthConfigSuccess = createAction(
  '[Auth] Load Auth Config Success',
  props<{data: AuthConfig }>()
);
export const loadAuthConfigFailure = createAction(
  '[Auth] Load Auth Config Failure',
  props<{ error: any }>()
);

// Check Authentication
export const checkAuthenticated = createAction(
  '[Auth] Check Authenticated'
);

export const checkAuthenticatedSuccess = createAction(
  '[Auth] Check Authenticated Success',
  props<{data: boolean }>()
);
export const checkAuthenticatedFailure = createAction(
  '[Auth] Check Authenticated Failure',
  props<{data: boolean }>()
);




// Login Actions
export const loadLogin = createAction(
  '[Auth] Load Login',
  props<{}>()
);
export const loadLoginSuccess = createAction(
  '[Auth] Load Login Success',
  props<{ data: any }>()
);
export const loadLoginFailure = createAction(
  '[Auth] Load Login Failure',
  props<{ error: any }>()
);

// Logout Actions
export const loadLogout = createAction(
  '[Auth] Load Logout',
  props<{}>()
);
export const loadLogoutSuccess = createAction(
  '[Auth] Load Logout Success',
  props<{ data: any }>()
);
export const loadLogoutFailure = createAction(
  '[Auth] Load Logout Failure',
  props<{ error: any }>()
);

