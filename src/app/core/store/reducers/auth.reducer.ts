import { Action, createReducer, on } from '@ngrx/store';
import OktaAuth from '@okta/okta-auth-js';
import * as AuthActions from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated?: boolean;
  authConfig?: any;
  checkAuthenticated?: boolean;
}

const initialState: State = {}

const authReducer = createReducer(
  initialState,
  on(AuthActions.loadAuthConfigSuccess, (state, action) => {    
    return {
      ...state,
      authConfig: action.data
    }
  }),
  on(AuthActions.checkAuthenticatedSuccess, (state, action) => {    
    return {
      ...state,
      isAuthenticated: action.data,
      checkAuthenticated: action.data
    }
  })
);


export function reducer(state: State | null, action: Action) {
  return authReducer(state, action);
}

export const isAuthenticated = (state: State) => state.isAuthenticated;
export const authConfig = (state: State) => state.authConfig;
export const checkAuthenticated = (state: State) => state.checkAuthenticated;

