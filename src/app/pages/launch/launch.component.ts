import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RootStore from '../../core/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {checkAuthenticated} from '../../core/store/actions/auth.actions';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit, OnDestroy {

  checkAuthSubs: Subscription;

  constructor(private store: Store<RootStore.State>, private router: Router) { 
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    this.checkAuthSubs = this.store.select(RootStore.checkAuthenticated).subscribe(
      (isAuth: boolean) => {        
        if (isAuth) {          
          this.router.navigate(['/admin']);
        }      
        if (isAuth != undefined && isAuth === false) { 
          this.router.navigate(['/login']); 
        } 
      }
    )
  }  


  ngOnInit(): void {
    this.store.dispatch(checkAuthenticated())
  }

  ngOnDestroy(): void {
    this.checkAuthSubs.unsubscribe();
  }

}
