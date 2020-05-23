import * as AuthReducers from './reducers/auth.reducer';
import { ActionReducerMap, ActionReducerFactory, ActionReducer, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../../../environments/environment.prod';

export interface State {
    auth: AuthReducers.State
}

export const reducers: ActionReducerMap<State> = {
    auth: AuthReducers.reducer
}

export function localStrategySyncReducer(reducer: ActionReducer<State>): ActionReducer<State> {
    return localStorageSync(
        {
            keys: [
                
            ],
            rehydrate: true
        }
    )(reducer)
}

export const metaReducers: MetaReducer<State>[] = 
    !environment.production ? [localStrategySyncReducer]: [localStrategySyncReducer];

export const selectAuthFeature = createFeatureSelector<AuthReducers.State>('auth');
export const isAuthenticated = createSelector(selectAuthFeature, AuthReducers.isAuthenticated);
export const authConfig = createSelector(selectAuthFeature, AuthReducers.authConfig);
export const checkAuthenticated = createSelector(selectAuthFeature, AuthReducers.checkAuthenticated);