import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';
import { AuthConfig } from '../models/auth-config';
import { Login } from '../models/login';
import { Store } from '@ngrx/store';
import * as RootStore from '../store';
import * as AuthActions from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oktaAuth;
  constructor(private router: Router, private store: Store<RootStore.State>) {
    this.store.select(RootStore.authConfig).subscribe(
      (authConfig: AuthConfig) => {
        if(authConfig) {
          const {issuer, clientId} = authConfig;
          this.oktaAuth = new OktaAuth({issuer: issuer, clientId: clientId});
        }
      }
    )
  }

  async checkAuthenticated() {
    const authenticated = await  this.oktaAuth.session.exists();
    return authenticated;
  }

  async login(loginDetails: Login) {
    const {username, password} = loginDetails;
    const transaction = await  this.oktaAuth.signIn({username, password});
    if (transaction.status !== 'SUCCESS') {
      throw Error('We cannot handle the ' + transaction.status + ' status');
    }   
    this.oktaAuth.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string) {    
    try {
      await  this.oktaAuth.signOut();
      this.oktaAuth.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }

}
