import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RootStore from '../../core/store';
import * as AuthActions from '../../core/store/actions/auth.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {


  constructor(private store: Store<RootStore.State>) {
  }

  ngOnInit() {    
  }



  logout() {
    this.store.dispatch(AuthActions.loadLogout("/"))
  }

  ngOnDestroy() {    
  }

}
