import { Component, OnInit } from '@angular/core';

import * as RootStore from './core/store';
import * as AuthActions from './core/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthConfig } from './core/models/auth-config';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FMS';
  returnUrl: any;
  constructor(private store: Store<RootStore.State>, private router: Router,
    private route: ActivatedRoute) {
    this.checkAuthenticated();
    this.authClient();
  }

  checkAuthenticated() {
    this.store.select(RootStore.checkAuthenticated).subscribe(
      (isLoggedIn: boolean) => {        
        if (isLoggedIn === false) {    
        console.log("check")
          this.router.navigate(['login']);
        } 
      }
    )
  }

  authClient() {
    this.store.select(RootStore.authConfig).subscribe(
      (authClient: AuthConfig) => {
        if (authClient) {          
          this.store.dispatch(AuthActions.checkAuthenticated());
        }
      }
    );
  }

  ngOnInit() {    
    this.store.dispatch(AuthActions.loadAuthConfig());
  }

}
